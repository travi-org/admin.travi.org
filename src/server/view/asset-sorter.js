export default function (a, b) {
  if (a.includes('manifest')) return -1;
  else if (b.includes('manifest')) return 1;
  else if (a.includes('vendor')) return -1;
  else if (b.includes('vendor')) return 1;

  return 0;
}
