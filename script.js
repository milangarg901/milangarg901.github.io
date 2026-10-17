const values = [3, 8, 14, 21, 32, 47, 59, 68, 76, 89, 95];
const array = document.querySelector('#array');
const target = document.querySelector('#target');
const status = document.querySelector('#status');
const stepButton = document.querySelector('#step');
let low, high, middle, steps, found;
function render() {
  array.replaceChildren(...values.map((value, index) => {
    const cell = document.createElement('span');
    cell.className = 'cell';
    if (index < low || index > high) cell.classList.add('eliminated');
    if (index === middle) cell.classList.add('middle');
    if (found && index === middle) cell.classList.add('found');
    cell.textContent = value;
    cell.setAttribute('aria-label', `${value}${found && index === middle ? ', found' : index === middle ? ', middle value' : index < low || index > high ? ', eliminated' : ', in search space'}`);
    return cell;
  }));
}
function reset() {
  low = 0; high = values.length - 1; middle = -1; steps = 0; found = false;
  stepButton.disabled = false;
  status.textContent = `Target: ${target.value}. Start with all ${values.length} values.`;
  render();
}
function step() {
  if (found) return;
  if (middle !== -1) {
    if (values[middle] < Number(target.value)) low = middle + 1;
    else high = middle - 1;
  }
  middle = Math.floor((low + high) / 2);
  steps++;
  const value = values[middle];
  found = value === Number(target.value);
  status.textContent = found
    ? `Found ${value} at index ${middle} in ${steps} ${steps === 1 ? 'step' : 'steps'}.`
    : `Step ${steps}: middle is ${value}. ${target.value} is ${Number(target.value) < value ? 'smaller — search the left half' : 'larger — search the right half'} next.`;
  stepButton.disabled = found;
  render();
}
stepButton.addEventListener('click', step);
document.querySelector('#reset').addEventListener('click', reset);
target.addEventListener('change', reset);
document.querySelector('#year').textContent = new Date().getFullYear();
reset();
