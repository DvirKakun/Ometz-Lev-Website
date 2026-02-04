import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import {
  type RegistrationData,
  getSheetHeaders,
  convertToSheetRow,
} from "./registrationFieldsConfig";

/**
 * Initialize and return authenticated Google Spreadsheet instance
 */
async function initializeSheet() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    throw new Error(
      "Missing Google Sheets configuration environment variables",
    );
  }

  // Create JWT auth instance
  const serviceAccountAuth = new JWT({
    email: serviceAccountEmail,
    key: privateKey.replace(/\\n/g, "\n"), // Handle escaped newlines
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  // Initialize the sheet
  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
  await doc.loadInfo();

  return doc;
}

/**
 * Style the header row with colors, bold text, and RTL formatting for Hebrew
 */
async function styleHeaderRow(sheet: any, columnCount: number) {
  try {
    // Load the header row cells
    await sheet.loadCells(`A1:${String.fromCharCode(64 + columnCount)}1`);

    // Style each header cell
    for (let i = 0; i < columnCount; i++) {
      const cell = sheet.getCell(0, i);

      // Set background color (blue)
      cell.backgroundColor = { red: 0.26, green: 0.52, blue: 0.96 }; // #4285F4 (Google Blue)

      // Set text color (white)
      cell.textFormat = {
        bold: true,
        fontSize: 11,
        foregroundColor: { red: 1, green: 1, blue: 1 }, // White
      };

      // Right align for RTL (Hebrew)
      cell.horizontalAlignment = "RIGHT";
      cell.verticalAlignment = "MIDDLE";

      // Set text direction to RTL
      cell.textDirection = "RIGHT_TO_LEFT";
    }

    // Save the styled cells
    await sheet.saveUpdatedCells();

    // Freeze the header row and set sheet to RTL
    await sheet.updateProperties({
      gridProperties: {
        frozenRowCount: 1,
      },
      rightToLeft: true, // Set entire sheet to RTL mode
    });

    console.log("Header row styled successfully with RTL support");
  } catch (error) {
    console.error("Error styling header row:", error);
    // Don't throw - styling is optional, continue with data insertion
  }
}

/**
 * Apply alternating row colors (zebra striping) and RTL formatting
 * No row limit - will automatically apply to all future rows
 */
async function applyAlternatingRowColors(sheet: any) {
  try {
    const sheetId = sheet.sheetId;

    await sheet._spreadsheet.batchUpdate({
      requests: [
        // Add banding (alternating row colors)
        {
          addBanding: {
            bandedRange: {
              range: {
                sheetId: sheetId,
                startRowIndex: 1, // Start after header
                startColumnIndex: 0,
                // No endRowIndex = applies to all rows infinitely
              },
              rowProperties: {
                headerColor: { red: 0.26, green: 0.52, blue: 0.96 }, // Blue header
                firstBandColor: { red: 1, green: 1, blue: 1 }, // White
                secondBandColor: { red: 0.95, green: 0.95, blue: 0.95 }, // Light gray
              },
            },
          },
        },
        // Set RTL (right-to-left) for all cells
        {
          repeatCell: {
            range: {
              sheetId: sheetId,
              startRowIndex: 1, // Start after header
              startColumnIndex: 0,
            },
            cell: {
              userEnteredFormat: {
                horizontalAlignment: "RIGHT",
                textDirection: "RIGHT_TO_LEFT",
              },
            },
            fields: "userEnteredFormat(horizontalAlignment,textDirection)",
          },
        },
      ],
    });

    console.log(
      "Alternating row colors and RTL formatting applied successfully",
    );
  } catch (error) {
    console.error("Error applying alternating colors and RTL:", error);
    // Don't throw - styling is optional
  }
}

/**
 * Save registration data to Google Sheet
 * Uses centralized field configuration for consistency
 */
export async function saveRegistrationToSheet(
  data: RegistrationData,
): Promise<void> {
  try {
    const doc = await initializeSheet();

    // Get or create the first sheet
    let sheet = doc.sheetsByIndex[0];

    // Get headers from centralized configuration
    const headers = getSheetHeaders();

    let isNewSheet = false;

    if (!sheet) {
      // Create a new sheet if it doesn't exist
      sheet = await doc.addSheet({
        headerValues: headers,
      });
      await sheet.loadHeaderRow();
      isNewSheet = true;
    } else {
      // Check if first row has any content by loading cells
      await sheet.loadCells("A1:Z1");
      const firstRowHasContent =
        sheet.getCell(0, 0).value !== null && sheet.getCell(0, 0).value !== "";

      if (!firstRowHasContent) {
        // First row is empty - set headers
        console.log("First row empty, setting headers");
        await sheet.setHeaderRow(headers);
        await sheet.loadHeaderRow();
        isNewSheet = true;
      } else {
        // First row has content - load as headers
        await sheet.loadHeaderRow();
      }
    }

    // Style the header row if this is a new sheet
    if (isNewSheet) {
      await styleHeaderRow(sheet, headers.length);
      await applyAlternatingRowColors(sheet);
    }

    // Format timestamp in Israeli timezone
    const timestamp = new Date().toLocaleString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jerusalem",
    });

    // Convert data to sheet row using centralized configuration
    const rowData = convertToSheetRow(data, timestamp);

    // Add the row to the sheet
    await sheet.addRow(rowData);

    console.log("Successfully saved registration to Google Sheets");
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    // Re-throw to let the calling function handle it
    throw new Error(
      `Failed to save to Google Sheets: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
