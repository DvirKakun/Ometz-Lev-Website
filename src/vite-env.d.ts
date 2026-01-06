/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PRISMIC_REPOSITORY_NAME: string;
    readonly VITE_PRISMIC_API_ENDPOINT: string;
    readonly VITE_PRISMIC_ACCESS_TOKEN: string;
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_BREVO_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
