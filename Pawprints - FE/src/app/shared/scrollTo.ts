export function scrollTo(index: number, elements: any) {
  const element = elements.toArray()[index].nativeElement;

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - 30,
    behavior: 'smooth',
  });
}
