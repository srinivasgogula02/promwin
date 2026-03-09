'use server'

import { supabase } from '@/lib/supabase'

export async function joinWaitlist(formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        return { error: 'Email is required' }
    }

    const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

    if (error) {
        if (error.code === '23505') {
            return { error: 'This email is already on the waitlist!' }
        }
        console.error('Error joining waitlist:', error)
        return { error: 'Failed to join waitlist. Please try again.' }
    }

    return { success: true }
}
