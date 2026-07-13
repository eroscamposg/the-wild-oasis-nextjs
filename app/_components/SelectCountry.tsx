import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}) {
  const countries = await getCountries();
  const alpha =
    countries.find((country) => country.names.common === defaultCountry)?.codes.alpha_2 ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the alpha into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${alpha}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.names.common} value={`${c.names.common}%${c.codes.alpha_2}`}>
          {c.names.common}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
