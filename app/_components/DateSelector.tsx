'use client';

import { Cabin } from '@/types/Cabin';
import { Settings } from '@/types/Settings';
import { differenceInDays, isPast, isSameDay, isWithinInterval } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from './ReservationContext';
import { DateRange } from 'react-day-picker';

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  if (!range || !range.from || !range.to) {
    return false;
  }

  const { to, from } = range;

  return (
    range.from &&
    range.to &&
    datesArr.some((date) => isWithinInterval(date, { start: from, end: to }))
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}) {
  const { min_booking_length: minBookingLength, max_booking_length: maxBookingLength } = settings;

  // Dates
  const { range, setRange, resetRange } = useReservation();

  // const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;
  // Num nights
  const { from, to } = range ?? {};
  const numNights = from && to ? differenceInDays(to, from) : 0;

  // Other cabin data
  const { regular_price: regularPrice, discount } = cabin;

  // Cabin price
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const endMonth = new Date(new Date().getFullYear() + 5, 11);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={endMonth}
        hidden={{ before: new Date() }}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))
        }
        // NOTE: Save us from using isAlreadyBooked
        excludeDisabled
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">${regularPrice}</span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
