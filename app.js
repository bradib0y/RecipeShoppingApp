document.addEventListener('DOMContentLoaded', (eventLoad) => {
  /*Initials*/
  const form = document.querySelector('#registrar');
  const input = form.querySelector('input');
  input.style.color = "rgb(75,75,75)";
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');  
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');  
  filterLabel.textContent = "Hide the checked ingredients";
  filterCheckbox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);
  
  /*Filter*/
  filterCheckbox.addEventListener('change', (e)=>{
    if (e.target.checked){
      for (let i = 0; i < ul.children.length; i++){
        const li = ul.children[i];
        if(li.className === 'responded'){
          li.style.display = 'none';
          }
        }
    }
    else{
      for (let i = 0; i < ul.children.length; i++){
        const li = ul.children[i];
        if(li.className === 'responded'){
          li.style.display = 'list-item';
          }
        }
    }
  });
  
  /*Adding a new invitee*/
  form.addEventListener('submit',
      (e)=>{
        
        /*Custom HTML element creator function*/
        function createE(t, p, v){
            /*creating an HTML element with t tagname, and settings it's p property to v value*/
            const element = document.createElement(t);
            if(p){element[p] = v;}
            return element;
        }
        
        e.preventDefault();
        const text = input.value;
        input.value = text + ' added ;)';                     
        const li = createE('li');
        const span = createE('span', 'innerHTML', text);
        li.appendChild(span);
        const label = createE('label', 'textContent', 'Already have it');        
        const checkbox = createE('input', 'type', 'checkbox');
        label.appendChild(checkbox);
        li.appendChild(label);    
        const ebutton = createE('button', 'textContent', 'Edit');
        li.appendChild(ebutton);      
        const rbutton = createE('button', 'textContent', 'Remove');
        li.appendChild(rbutton);
        ul.appendChild(li);
        let c = 75;
        let myInterval = setInterval(()=>{
            if(c<155){
                        c+=15;
                        input.style.color = "rgb("+c+","+c+","+c+")"; 
                      }
            if(c<255){
                        c+=5;
                        input.style.color = "rgb("+c+","+c+","+c+")"; 
                      }
            else{
              input.value = '';
              input.style.color = "rgb(75,75,75)";
               clearInterval(myInterval);}
                     },32);  
     }    
     );
  
  /*Tracking the existing ingredients*/
  ul.addEventListener('change', (e) =>
    {
      if(event.target.type === 'checkbox'){
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    if(checked) {listItem.className = "responded";}
    else {listItem.className = "";}
      }} 
   );
  
  /*Removing, editing, saving existing recipe ingredients*/
  ul.addEventListener('click', (e) =>
    {      
    if(e.target.tagName === 'BUTTON'){
      const button = event.target;
      const listItem = button.parentNode;
      const clickHandlers = {
        Remove: () => {
          ul.removeChild(listItem);},
        Edit: () => {
          const input = document.createElement('input');
          const span = listItem.firstElementChild;
          let text = span.textContent;
          listItem.insertBefore(input, span);
          listItem.removeChild(span);
          input.value = text;
          input.focus();
          button.textContent = 'Save';
        },
        Save: () => {
          const input = listItem.firstElementChild;
          const text = input.value;
          const span = document.createElement('span');
          span.textContent = text;
          listItem.insertBefore(span, input);
          listItem.removeChild(input);
          button.textContent = "Edit";      
        }
      };
      clickHandlers[button.textContent]();
    }
    });
});