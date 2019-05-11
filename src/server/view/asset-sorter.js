export default function (a, b) {
  if (a.includes('manifest')) return -1;
  if (b.includes('manifest')) return 1;
  if (a.includes('vendor')) return -1;
  if (b.includes('vendor')) return 1;

  return 0;
}
