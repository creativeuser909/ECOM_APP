
document.addEventListener('DOMContentLoaded', () => {
    const parentDiv = document.querySelector('.main');
    const childDivs = document.querySelectorAll('.child');
  
    const parentRect = parentDiv.getBoundingClientRect();
    const parentCenterX = parentRect.left + parentRect.width / 2;
  
    let closestChild = null;
    let closestDistance = Infinity;
  
    childDivs.forEach(child => {
      const childRect = child.getBoundingClientRect();
      const childCenterX = childRect.left + childRect.width / 2;
  
      const distance = Math.abs(childCenterX - parentCenterX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestChild = child;
      }
    });
  
    console.log(`The center div is: ${closestChild.className}`);
  });
  