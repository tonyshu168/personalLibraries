(function(){
  /*
  const lis = document.querySelectorAll(".drag li");

  let draggingElementOrder;
  let draggingElement;

  for (let i = 0; i < lis.length; i++) {
    lis[i].setAttribute("draggable", true);

    lis[i].addEventListener("dragstart", function(event) {
      draggingElement = event.target;
    });
    lis[i].addEventListener("dragenter", function(event) {
      //每次都要新计算，因为有可能已经换位了
      draggingElementOrder = Array.from(draggingElement.parentElement.children).indexOf(draggingElement);
      const node = event.target;
      draggingElementPosition = draggingElement.getBoundingClientRect();
      const order = Array.from(node.parentElement.children).indexOf(node);
      //从大的序号移入到小的序号
      if (draggingElementOrder > order) {
        node.parentElement.insertBefore(draggingElement, node);
      }
      //从小的序号移入到大的序号
      else {
        //节点不是最后一个
        if (node.nextElementSibling) {
          node.parentElement.insertBefore(draggingElement, node.nextElementSibling);
        }
        // 节点是最后一个了，不能再用insertBefore
        else {
          node.parentElement.appendChild(draggingElement);
        }
      }
    });
  }
  */

  // const lis = document.querySelectorAll(".drag li");
  const lis = document.querySelectorAll(".drag .item");
  let draggingElementOrder;
  let draggingElement;
  let draggingElementPosition;
  let animating;
  for (let i = 0; i < lis.length; i++) {
    lis[i].setAttribute("draggable", true);
    lis[i].addEventListener("dragstart", (event) => {
      draggingElement = event.target;
    });

    lis[i].addEventListener("dragover", (event) => {
      //不能用dragenter，因为dragenter只会触发一次，有时候鼠标动作是来回进出的
      //每次都要新计算，因为有可能已经换位了
      draggingElementOrder = Array.from(draggingElement.parentElement.children).indexOf(draggingElement);
      const node = event.target;
      if (node !== draggingElement && !animating) {
        draggingElementPosition = draggingElement.getBoundingClientRect();
        const order = Array.from(node.parentElement.children).indexOf(node);
        //从大的序号移入到小的序号
        if (draggingElementOrder > order) {
          node.parentElement.insertBefore(draggingElement, node);
        }
        //从小的序号移入到大的序号
        else {
          //节点不是最后一个
          if (node.nextElementSibling) {
            node.parentElement.insertBefore(draggingElement, node.nextElementSibling);
          }
          // 节点是最后一个了，不能再用insertBefore
          else {
            node.parentElement.appendChild(draggingElement);
          }
        }
        const currentPosition = draggingElement.getBoundingClientRect();

        node.style.transform = `translateY(${currentPosition.y - draggingElementPosition.y}px)`;
        draggingElement.style.transform = `translateY(${-currentPosition.y + draggingElementPosition.y}px)`;
        animating = true;
        requestAnimationFrame(() => {
          draggingElement.style.transition = "transform .1s linear";
          node.style.transition = "transform .1s linear";
          node.style.transform = "translateY(0)";
          draggingElement.style.transform = "translateY(0)";
          node.addEventListener("transitionend", transitionEnd);
        });
      }
    });
    function transitionEnd() {
      //不能用箭头函数，因为有this
      this.style.transform = null;
      this.style.transition = null;
      draggingElement.style.transform = null;
      draggingElement.style.transition = null;
      this.removeEventListener("transitionend", transitionEnd);
      animating = false;
    }
  }
})()