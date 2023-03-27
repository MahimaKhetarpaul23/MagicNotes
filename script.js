/*
		
	     let textArea = document.getElementById('text-area');
		 textArea.addEventListener('focus',function(e){
		        e.preventDefault();
				textArea.setAttribute('style','border:4px solid lightblue');
		 });
		 textArea.addEventListener('blur',function(e){
		        e.preventDefault();
				textArea.setAttribute('style','border:1px solid lightgrey');
		 });
		 
		 
		 
		 // when page is refreshed , then all earlier saved notes should also come..
		 let count = parseInt(localStorage.getItem('countOfNotes'));
		 
		 // Deleting use-add-note link when note is added..
		 if(count>0){
			 let useAddNoteLine = document.getElementById('use-add-note');
			 useAddNoteLine.style.display='none';
		 }
		 
		 for(let i=1;i<count;i++){ 
		      let divCreated = document.createElement('div');
			  divCreated.setAttribute('style','border:1px solid black;box-shadow:0px 0px 2px 2px lightgrey;padding:4vh 2vw;height:auto;width:13vw;margin:2vh 2vw');
			  
			  let key=localStorage.getItem(i);
			  divCreated.innerHTML = `<b style="margin-bottom:4vh;font-size:1.3rem"> Note <span> ${i} </span> </b> <br> ${key} <br> <input class="delete-note-btn" style="margin-top:4vh;padding:1vh 1vw;height:2rem;background-color:#0077e6;color:white;border:1px solid #0077e6;border-radius:3px" type="button" value="Delete Note">`;		
				
			  let yourNotesDiv = document.getElementById('your-notes');
			  yourNotesDiv.appendChild(divCreated);	
		
		 }
		 
		 
		 let btn = document.getElementById('addNotes-btn');
		 btn.addEventListener('click',function(){
				let input = textArea.value;
				if(input == '' || input == ' '){
				   alert('Firstly,add some text!!');
				   return;
				}
				
				let divCreated = document.createElement('div');
				divCreated.setAttribute('style','border:1px solid black;box-shadow:0px 0px 2px 2px lightgrey;padding:4vh 2vw;height:auto;width:13vw;margin:2vh 2vw');
				// let text = document.createTextNode(input); 	
                let noteNo = localStorage.getItem('countOfNotes');	
				if(noteNo==null){
				    noteNo=1;
				}	
				noteNo=parseInt(noteNo);
				// console.log(noteNo); 
				divCreated.innerHTML=`<b style="margin-bottom:4vh;font-size:1.3rem"> Note <span> ${noteNo} </span> </b> <br> ${input} <br> <input class="delete-note-btn" style="margin-top:4vh;padding:1vh 1vw;height:2rem;background-color:#0077e6;color:white;border:1px solid #0077e6;border-radius:3px" type="button" value="Delete Note">`;
				
				localStorage.setItem('countOfNotes',noteNo+1);
				localStorage.setItem(noteNo,input);
				
				let yourNotesDiv = document.getElementById('your-notes');
				yourNotesDiv.appendChild(divCreated);
				
				// Deleting use-add-note link when note is added..
				if(noteNo==1){
					let useAddNoteLine = document.getElementById('use-add-note');
					useAddNoteLine.style.display='none';
				}
				
		 });
		
				// Deleting Note
				let deleteNoteBtn = document.getElementsByClassName('delete-note-btn');
				console.log(deleteNoteBtn);
				
				for(let j=0;j<deleteNoteBtn.length;j++){
					// console.log(deleteNoteBtn[j]);
					
					deleteNoteBtn[j].addEventListener('click',function(e){
					     // console.log('deleteNoteBtnClicked');
						 
						 let parent=e.target.parentNode;
							// console.log(parent);
						 let noteValue = parent.querySelector('span').innerText;	
						 console.log(noteValue);
						 parent.remove();
						 localStorage.removeItem(noteValue);
						 
					})
		        }
			
			*/
			
			// Showing already saved notes from local storage:
			    let notes = localStorage.getItem('notes');
				let notesArr;
				if(notes==null){
				    notesArr=[];       // setting it to empty array.
				}
				else{
				    notesArr=JSON.parse(notes);
				}
			    let length = notesArr.length;
				if(length!=0){
					for(let i=0;i<length;i++){
						 let divCreated = document.createElement('div');
						 divCreated.className="note-div";
						 divCreated.setAttribute('style','border:1px solid black;box-shadow:0px 0px 2px 2px lightgrey;padding:4vh 2vw;height:auto;width:13vw;margin:2vh 2vw');
						 // let text = document.createTextNode(input); 	
									 
						 divCreated.innerHTML=`<b style="margin-bottom:4vh;font-size:1.3rem"> Note <span> ${i+1} </span> </b> <br> ${notesArr[i]} <br> 
											   <input id="${i}" onclick="deleteNotes(this.id)" class="delete-note-btn" style="margin-top:4vh;padding:1vh 1vw;height:2rem;background-color:#0077e6;
												color:white;border:1px solid #0077e6;border-radius:3px" type="button" value="Delete Note">`;
							
						 let yourNotesDiv = document.getElementById('your-notes');
						 yourNotesDiv.appendChild(divCreated);	
					}
					// Deleting use-add-note-line:
						let useAddNoteLine = document.getElementById('use-add-note');
						useAddNoteLine.style.display='none';
				}
			
			
			
			
			let addNotesBtn = document.getElementById('addNotes-btn');
			
			// On clicking on addNotesBtn, notes should be added to local Storage in form of array and div.
			addNotesBtn.addEventListener('click',function(){
					let textArea = document.getElementById('text-area');
					let input = textArea.value;
					
					// ----------------   adding validations and showing alert : ----------------------------
					let msg=document.getElementById('display-alert');
				    let type,message;
					if(input.length<=1){
						type="Failure";   
						message="Enter correct input.";
						console.log("Failure");
					}
					else{
						console.log("Success");
						type="Success";
						message="Notes saved successfully.";
					}
				
					msg.innerHTML=`<div style="height:1.8rem;box-model:border-box;padding-left:2.5vw;padding-top:1vh">
												${type} : ${message}
									</div>`;
					if(type=="Success"){
						msg.setAttribute("style","background-color:lightgreen;margin-left:-1vw;margin-right:-0.4vw");
						console.log("Success");
					}	
					else{
						msg.setAttribute("style","background-color:lightpink;margin-left:-1vw;margin-right:-0.4vw");
						console.log("Failure");
					}				
					
					// The alert should be removed after 4seconds, so for that we will use setTimeout function.
					setTimeout(function(){
						  msg.style.display="none";
						  // msg.innerHTML='';
					},4000);
					// ----------------------------------------------------------------------------------------------	
						
					if(type=="Success"){
						let notes = localStorage.getItem('notes');
						let notesArr;
						if(notes==null){
							notesArr=[];
						}
						else{
							notesArr = JSON.parse(notes);
						}
						
						// adding notes to array:
						notesArr.push(input);
						
						// Updating localStorage:
						localStorage.setItem('notes',JSON.stringify(notesArr));
						
						console.log(notesArr);
						
						// Calling function showNotes to display notes in the div:
						showNotes(notesArr);
						
						// Making text-area field empty:
						textArea.value=" ";
						
						// Deleting use-add-note-line:
						let useAddNoteLine = document.getElementById('use-add-note');
						useAddNoteLine.style.display='none';
					}
			});
			
			function showNotes(notesArr){
				     let divCreated = document.createElement('div');
					 divCreated.className="note-div";
					 divCreated.setAttribute('style','border:1px solid black;box-shadow:0px 0px 2px 2px lightgrey;padding:4vh 2vw;height:auto;width:13vw;margin:2vh 2vw');
					 // let text = document.createTextNode(input); 	
					 let length=notesArr.length;
					 console.log(length);		
					 divCreated.innerHTML=`<b style="margin-bottom:4vh;font-size:1.3rem"> Note <span> ${length}  </span> </b> <br> ${notesArr[length-1]} <br> 
										 <input id="${length-1}" onclick="deleteNotes(this.id)" class="delete-note-btn" style="margin-top:4vh;padding:1vh 1vw;height:2rem;background-color:#0077e6;
										 color:white;border:1px solid #0077e6;border-radius:3px" type="button" value="Delete Note">`;
					 	
					 let yourNotesDiv = document.getElementById('your-notes');
					 yourNotesDiv.appendChild(divCreated);	
			}
				
			// we have given each button an id as its index and calling onclick function like onclick=deleteNodes(this.id) // its id is passed as arguments.:
			// To remove elements from array we can use splice function:
			// splice(i,1);   (As we have to remove one element from index i and don't have to add anything!!!);
			
			function deleteNotes(index){
					console.log(index,"is deleted");
					
					let notes = localStorage.getItem('notes');
					let notesArr;
					if(notes==null){
					    notesArr=[];
					}
					else{
					    notesArr=JSON.parse(notes);
					}
					notesArr.splice(index,1);    // Deleting note at particualr index.
					localStorage.setItem('notes',JSON.stringify(notesArr));
					
					// Deleting earlier notes and showing new notes (Clearing the div):
					let yourNotesDiv = document.getElementById('your-notes');
					yourNotesDiv.innerHTML="";
					
					let length = notesArr.length;
					if(length==0){
						let useAddNoteLine = document.getElementById('use-add-note');
						useAddNoteLine.style.display='block';
					}
					if(length!=0){
						for(let i=0;i<length;i++){
							 let divCreated = document.createElement('div');
							 divCreated.className="note-div";
							 divCreated.setAttribute('style','border:1px solid black;box-shadow:0px 0px 2px 2px lightgrey;padding:4vh 2vw;height:auto;width:13vw;margin:2vh 2vw');
							 // let text = document.createTextNode(input); 	
										 
							 divCreated.innerHTML=`<b style="margin-bottom:4vh;font-size:1.3rem"> Note <span> ${i+1} </span> </b> <br> ${notesArr[i]} <br> 
												   <input id="${i}" onclick="deleteNotes(this.id)" class="delete-note-btn" style="margin-top:4vh;padding:1vh 1vw;height:2rem;background-color:#0077e6;
													color:white;border:1px solid #0077e6;border-radius:3px" type="button" value="Delete Note">`;
								
							 let yourNotesDiv = document.getElementById('your-notes');
							 yourNotesDiv.appendChild(divCreated);	
						}
					}	
			}	
			
			
			
			// Search ......................................................................
			// 'input' event is fired when ever something is written into input.
			
			let searchInput = document.getElementById('search-input');
			searchInput.addEventListener('input',function(){
					
					console.log('Input event fired',searchInput.value);
					let divs = document.getElementsByClassName('note-div');
					console.log(divs);
					for(let i=0;i<divs.length;i++){
						console.log(divs[i]);
						let divText = divs[i].innerText;
						console.log("divText",divText);
						// console.log("ParentNode",divText.parentNode);
						if(searchInput.value.length<=0){
						    divs[i].style.display="inline-block";
							divs[i].style.boxShadow="0px 0px 2px 2px lightgrey";
						}
						else if(divText.includes(searchInput.value)){ 
							divs[i].style.boxShadow="0px 0px 2px 2px yellow";
							// divText.style.backgroundColor="lightpink"; 
						}
						else{
							divs[i].style.display='none';
						}  
					}	
			});
			
			
			
			/* Todos::
				Further Features:
				1. Add Title
				2. Mark a note as Important
				3. Separate notes by user
				4. Sync and host to web server  
			
			I continued further on the code given and implemented following:
					1. added title for notes
					2. added mark as important
					3. asking for confirmation before deleting important marked note
					4. improved search
					5. search suggestions for notes title
					6. form validations before adding note
					7. Editable notes
					8. Import - export notes
			 */