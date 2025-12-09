import { NextResponse } from 'next/server';

// Returns a Google OAuth 2.0 authorization URL used by the frontend to start
// the sign-in flow. Exposes a minimal implementation so the App Route is a
// valid module during build. The real implementation should validate
// environment variables and handle errors / logging appropriately.
export async function GET() {
	const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
	const appUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

	const redirectUri = `${appUrl.replace(/\/$/, '')}/api/auth/google/callback`;

	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: 'openid profile email',
		access_type: 'offline',
		prompt: 'consent',
	});

	const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

	return NextResponse.json({ url });
}

export {};

