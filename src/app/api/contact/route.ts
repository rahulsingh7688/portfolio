import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // In production, integrate Resend or Nodemailer here
    // For now, log and return success
    console.log('Contact form submission:', result.data);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
