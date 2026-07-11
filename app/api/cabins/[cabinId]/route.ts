import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, ctx: RouteContext<'/api/cabins/[cabinId]'>) {
  const { cabinId } = await ctx.params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: 'Cabin not found' });
  }
}

// export async function POST() {}
