import { createBooking, getBooking } from './src/services/booking.service';
import { CreateBookingPayload } from './src/types/api';
import { apiClient } from './src/api/client';

// Change apiClient baseURL since we are running in Node
apiClient.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

async function test() {
  try {
    const payload: CreateBookingPayload = {
      name: 'Test User',
      age: 28,
      gender: 'Male',
      city: 'Mumbai',
      whatsapp: '+919999999999',
      instagram: '@testuser',
      heightCm: 180,
      weightKg: 80,
      goals: ['Strength', 'Flexibility'],
      equipment: ['Dumbbells'],
      preferredDuration: '3 Months',
      preferredDays: ['Monday', 'Wednesday'],
      preferredTime: ['Morning'],
      previousExperience: true,
    };
    
    console.log('--- Creating Booking ---');
    const newBooking = await createBooking(payload);
    console.log('Created Booking ID:', newBooking.id);
    
    console.log('\n--- Fetching Booking by ID ---');
    const fetchedBooking = await getBooking(newBooking.id);
    console.log('Fetched Booking:', fetchedBooking.name, fetchedBooking.booking_status);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
