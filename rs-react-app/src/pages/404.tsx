import Link from 'next/link';

export default function Error() {
  return (
    <h1>
      Oops Error Please try <Link href={'/page/1'}>reload</Link> this page
    </h1>
  );
}
