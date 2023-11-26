
        function validateForm() {
          var name = document.getElementById("name").value;
          var genderFemale = document.getElementById("check-female").checked;
          var genderMale = document.getElementById("check-male").checked;
          var dob = document.getElementById("DOB").value;
          var phoneNumber = document.getElementById("phoneNum").value;
          var email = document.getElementById("email").value;
          const photo = document.getElementById("photo").value; 
      
          if (name === "") {
            alert("Please enter your child name.");
            return false;
          }
  
          if (!genderFemale && !genderMale) {
            alert("Please select a your child gender.");
            return false;
          }
          
          if (photo === "") {
            alert("Please insert a photo of your child.");
            return false;
          }
          
          if (dob === "") {
            alert("Please enter a date of birth.");
            return false;
          }
  
          if (phoneNumber === "") {
            alert("Please enter a phone number.");
            return false;
          }
  
          if (email === "") {
            alert("Please enter an email address.");
            return false;
          }
          
          if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return false;
          }
          
          if (/^\d/.test(name)) {
            alert("Name field should not start with a number.");
            return false;
          }
          
          var childYear = new Date(dob).getFullYear();
  
          if (childYear > 2017) {
            alert("Children younger than 6 years old are not accepted.");
            return false;
          }
  
          return true;
        }function submitForm() {
          if (validateForm()) {
            const photoInput = document.getElementById("photo");
            const photoFile = photoInput.files[0];
        
            const name = document.getElementById("name").value;
            const dob = document.getElementById("DOB").value;
            const genderFemale = document.getElementById("check-female").checked;
            const phoneNumber = document.getElementById("phoneNum").value;
            const email = document.getElementById("email").value;
        
            
            const storedChildNames = localStorage.getItem("children");
            let childNames = [];
        
            if (storedChildNames) {
              childNames = JSON.parse(storedChildNames);
            }
        
            // Add new child name to the array
            childNames.push(name);
        
           
            localStorage.setItem("children", JSON.stringify(childNames));
        
            //  read the image file
            const reader = new FileReader();
        
            reader.onload = function () {
              const photoDataURL = reader.result;
        
              // Create a print
              const printContent = `
                <html>
                  <head>
                    <style>
                     div {
                      border: 1px solid black;
                      padding: 20px 10px;
                     }
                    </style>
                  </head>
                  <body>
                    <div class="print-container">
                      <img id="child-photo" src="${photoDataURL}" alt="Child Photo" style="width:200px;">
                      <p>Child name: ${name}</p>
                      <p>DOB: ${dob}</p>
                      <p>Gender: ${genderFemale ? "Female" : "Male"}</p>
                      <p>Phone: ${phoneNumber}</p>
                      <p>Email: ${email}</p>
                    </div>
        
                    <script>
                      const childPhoto = document.getElementById("child-photo");
                      childPhoto.onload = function () {
                        window.print();
                      };
                    </script>
                  </body>
                </html>
              `;
        
          
              const printWindow = window.open("", "_blank");
              printWindow.document.open();
              printWindow.document.write(printContent);
              printWindow.document.close();
            };
        
            reader.readAsDataURL(photoFile);
          }
        
          return false; // Prevent form submission
        }
        
        window.onload = function() {
          var theme = localStorage.getItem("theme");
        
          if (theme === "dark") {
            document.body.classList.add("dark-theme");
          } else {
            document.body.classList.remove("dark-theme");
          }
        };

     