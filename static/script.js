document.addEventListener("DOMContentLoaded", () => {
    let referenceContainer = document.getElementById("reference-container");

    //Fetch the references
    fetch("/references.json")
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                //No references present - display available upon request
                let onRequest = document.createElement("div");
                onRequest.innerHTML = "References available upon request";
                referenceContainer.appendChild(onRequest);
            }
        })
        .then(refJSON => {
            //Load the references into the DOM
            refJSON.references.forEach(ref => {
                let el = document.createElement("div");
                el.className = "reference";

                let name = document.createElement("h3");
                name.innerHTML = ref.name;
                el.appendChild(name);

                let relation = document.createElement("p");
                relation.innerHTML = ref.relation;
                el.appendChild(relation);

                let phoneContainer = document.createElement("div");
                let phoneIcon = document.createElement("span");
                phoneIcon.className = "material-icons";
                phoneIcon.innerHTML = "phone";
                phoneContainer.appendChild(phoneIcon);
                let phoneNum = document.createElement("span");
                phoneNum.innerHTML = ref.phone;
                phoneContainer.appendChild(phoneNum);
                el.appendChild(phoneContainer);

                let mailContainer = document.createElement("div");
                let mailIcon = document.createElement("span");
                mailIcon.className = "material-icons";
                mailIcon.innerHTML = "email";
                mailContainer.appendChild(mailIcon);
                let mailAddressContainer = document.createElement("span");
                let mailAddress = document.createElement("a");
                mailAddress.innerHTML = ref.email;
                mailAddress.setAttribute("href", "mailto:" + ref.email);
                mailAddressContainer.appendChild(mailAddress);
                mailContainer.appendChild(mailAddressContainer);
                el.appendChild(mailContainer);

                referenceContainer.appendChild(el);
            });
        }); 
});