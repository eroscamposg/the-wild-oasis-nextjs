import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';
import { NextRequest } from 'next/server';

// API routes, not as used anymore since Server Actions now exist
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/cabins/[cabinId]'>) {
  const { cabinId } = await ctx.params;
  console.log(cabinId);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (e) {
    return Response.json({ message: 'Cabin not found' });
  }
}

// export async function POST() {}
