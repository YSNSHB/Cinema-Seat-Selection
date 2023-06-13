



//##Variables##//

let priceNew = 0;

const toast = document.querySelector(".toast");

const viewOfTheCinemaHall = document.querySelector(".view-of-the-cinema-hall");
const mainCinemaHall = document.querySelector(".main-cinema-hall");
const M_S_P_Information = document.querySelector(".MSP-information");

const selectedSeatSection = document.querySelector(".selected-seat-section");
const selectedSeatInformationList = document.querySelector(".selected-seats-information-list");
const arrowImage = document.querySelector(".arrow-up-down");

const discountModal = document.getElementById("discount-modal");
const discountButton = document.getElementById("discount-btn");
const discountCloseButton = document.querySelector(".discount-close-btn");

const discountCodeInput = document.querySelector("#discount-code-input");
const discountWarningError = document.querySelector(".warning-error");

const prices = document.querySelector(".prices")

const paymentButton = document.querySelector(".payment-btn");




//##Functions##//

// --#Number of Selected-Seat#-- //
const numberOfSelectedSeats = function() {
    return document.querySelectorAll(".selected").length;
}
// --#Number of Epty-Seat#-- //
const numberOfEptySeats = function() {
    return document.querySelectorAll(".empty").length;
}
document.getElementById("capacity-number").innerHTML = numberOfEptySeats();





//* ----------Choose a Seat---------- *//

const seatSelected = (seatID) => {
    //Get Seat ClassName.&.ClassLists
    seatClassName = document.getElementById(seatID).className;
    seatClassList = document.getElementById(seatID).classList;
    //Calculation of Seat Row.&.Column Numbers
    seatIdArray = seatID.split("-");
    let rowNum = seatIdArray[2];
    let colNum = seatIdArray[3];



    //**Choose a Seat by Class-Name "empty"**//
    if (seatClassName.includes("empty")) {
        if (numberOfSelectedSeats() < 10) {
            //**Change Class-List**//
            seatClassList.remove("empty");
            seatClassList.add("selected");

            //**Add Selected-Seat information**//
            //Creat Element
            const selectedSeatInformation = document.createElement("div");
            selectedSeatInformation.className = "selected-seat";
            selectedSeatInformation.id = `selected-seat-${rowNum}-${colNum}`
            selectedSeatInformation.innerHTML = `ردیف ${rowNum}، صندلی شماره ${colNum}`
            //append Element
            document.querySelector(".selected-seats-information-list").append(selectedSeatInformation);
            //Sort Elements
            let newInnerHtml = "";
            const selectedSeatArray = document.querySelector(".selected-seats-information-list").innerHTML.split("</div>").sort();
            for (let i = 1; i < selectedSeatArray.length; i++) {
                newInnerHtml += selectedSeatArray[i];
                newInnerHtml += "</div>"
            }
            document.querySelector(".selected-seats-information-list").innerHTML = newInnerHtml;

            //**Selected-Seats information Section**//
            //**Show Section**//
            selectedSeatInformationSectionShoworHide();
            //for (width <= 992px)
            if (window.matchMedia("(max-width: 992px)").matches){
                //**Close Section**//
                selectedSeatSection.style.height = "58px";
                selectedSeatInformationList.style.display = "none";
                arrowImage.setAttribute("src", "./Images/arrow-2.svg");
            }

            //**Collect the Price**//
            priceNew += 45000;
            document.querySelector("#price").innerHTML = priceNew;

            //**Calculate Discount**//
            discountClac();

        //**Toast Error**//
        } else {
            toast.className = "toast show";
            setTimeout(function(){ toast.className = toast.className.replace("toast show", "toast"); }, 4000);
        }
    }



    //**Choose a Seat by Class-Name "selected"**//
    else if (seatClassName.includes("selected")) {
        //**Change Class-List**//
        seatClassList.remove("selected");
        seatClassList.add("empty");

        //**Remove Selected-Seat information**//
        document.querySelector(`#selected-seat-${rowNum}-${colNum}`).remove();
        
        //**Selected-Seats information Section**//
        //**Hide/Show Section**//
        selectedSeatInformationSectionShoworHide();
        //for (width <= 992px)
        if (window.matchMedia("(max-width: 992px)").matches) {
            //**Close Section**//
            selectedSeatSection.style.height = "58px";
            arrowImage.setAttribute("src", "./Images/arrow-2.svg");
            selectedSeatInformationList.style.display = "none";
        }
        
        //**Reduce the Price**//
        priceNew -= 45000;
        document.querySelector("#price").innerHTML = priceNew;

        //**Calculate Discount**//
        discountClac();
    }



    //**Change Color "Payment-btn"**//
    if (numberOfSelectedSeats() === 0) {
        paymentButton.className = ("payment-btn");
    } else {
        paymentButton.className = ("payment-btn active");
    }
}





//* ----------Selected-Seat information Section---------- *//

//**Show/Hide Section**//
const selectedSeatInformationSectionShoworHide = function() {
    //for (Number of Selected-Seats = 0)
    if (numberOfSelectedSeats() == 0) {
        //for (Width <= 768px)
        if (window.matchMedia("(max-width: 767.9px)").matches) {
            //**Updating the Style of "view-of-the-cinema-hall"**//
            viewOfTheCinemaHall.style.height = "calc(100% - 341px)";

            //**Updating the Style of "MSP-information"**//
            M_S_P_Information.style.height = "253px";

            //**Updating the Style of "selected-seat-information-section"**//
            selectedSeatSection.style.display = "none";
            selectedSeatInformationList.style.gridTemplateRows = "auto";
        }

        //for (768px < Width <= 992px)
        else if (window.matchMedia("(min-width: 768px)" && "(max-width: 992px)").matches) {
            //**Updating the Style of "view-of-the-cinema-hall"**//
            viewOfTheCinemaHall.style.height = "calc(100% - 239px)";

            //**Updating the Style of "MSP-information"**//
            M_S_P_Information.style.height = "151px";
            M_S_P_Information.style.gridTemplateRows = "151px";
            M_S_P_Information.style.gridTemplateAreas = `
            "movie price"
            `

            //**Updating the Style of "selected-seat-information-section"**//
            selectedSeatSection.style.display = "none";
            selectedSeatInformationList.style.gridTemplateRows = "auto";
        }

        //for (992px < Width)
        else {
            //**Updating the Style of "view-of-the-cinema-hall"**//
            viewOfTheCinemaHall.style.height = "100%";

            //**Updating the Style of "MSP-information"**//
            M_S_P_Information.style.height = "100%";

            //**Updating the Style of "selected-seat-information-section"**//
            selectedSeatSection.style.display = "flex";
            selectedSeatSection.style.height = "calc(100% - 423px)";
            selectedSeatInformationList.style.display = "grid";
            selectedSeatInformationList.style.height = "auto";
            selectedSeatInformationList.style.gridTemplateRows = "auto";
        }
    }



    //for (Nember of Selected-Seats >= 1)
    else {
        //for (Width <= 768px)
        if (window.matchMedia("(max-width: 767.9px)").matches) {
            //**Updating the Style of "view-of-the-cinema-hall"**//
            viewOfTheCinemaHall.style.height = "calc(100% - 407px)";

            //**Updating the Style of "MSP-information"**//
            M_S_P_Information.style.height = "319px";

            //**Updating the Style of "selected-seat-information-section"**//
            selectedSeatSection.style.display = "flex";
            selectedSeatInformationList.style.gridTemplateRows = "auto";
        }

        //for (768px < Width <= 992px)
        else if (window.matchMedia("(min-width: 768px)" && "(max-width: 992px)").matches) {
            //**Updating the Style of "view-of-the-cinema-hall"**//
            viewOfTheCinemaHall.style.height = "calc(100% - 305px)";

            //**Updating the Style of "MSP-information"**//
            M_S_P_Information.style.height = "217px";
            M_S_P_Information.style.gridTemplateRows = "58px 151px";
            M_S_P_Information.style.gridTemplateAreas = `
            "selectedSeat selectedSeat"
            "movie price"
            `

            //**Updating the Style of "selected-seat-information-section"**//
            selectedSeatSection.style.display = "flex";
            selectedSeatInformationList.style.gridTemplateRows = "auto";
        }

        //for (992px < Width)
        else {
            //**Updating the Style of "view-of-the-cinema-hall"**//
            viewOfTheCinemaHall.style.height = "100%";

            //**Updating the Style of "MSP-information"**//
            M_S_P_Information.style.height = "100%";

            //**Updating the Style of "selected-seat-information-section"**//
            selectedSeatSection.style.display = "flex";
            selectedSeatSection.style.height = "calc(100% - 423px)";
            selectedSeatInformationList.style.display = "grid";
            selectedSeatInformationList.style.height = "auto";
            selectedSeatInformationList.style.gridTemplateRows = gridTemplateRow();
        }
    }



    //**Calculate.&.Change the Selected-Seat Number**//
    document.querySelector("#the-number-of-selected-seats").innerHTML = `${numberOfSelectedSeats()} بلیت انتخاب شده`;
}



//**Open/Close Section**//
const selelctedSeatInformationSectionOnclick = function() {
    //**Calculate the Current Height**//
    let oldHeight = getComputedStyle(selectedSeatSection).height;
    const pIndex = oldHeight.indexOf("p");
    oldHeight = oldHeight.substring(0, pIndex);



    //for (Width <= 768px)
    if (window.matchMedia("(max-width: 767.9px)").matches) {
        //**Open Section**//
        if (oldHeight == 58) {
            //Calculate the New Hight
            let newHight = 133;
            newHight += ((Math.ceil(numberOfSelectedSeats() / 2) - 1) * 67);
            let newHightMSP = newHight + 261;

            //**Replace the Hight**//
            M_S_P_Information.style.height = `${newHightMSP}px`
            selectedSeatSection.style.height = `${newHight}px`;

            //**Change the Arrow-img**//
            arrowImage.setAttribute("src", "./Images/arrow-3.svg");
            
            //**Show Selected-Seats information List**//
            selectedSeatInformationList.style.display = "grid";
        } 

        //**Close Section**//
        else {
            //**Replace the Hight**//
            M_S_P_Information.style.height = "319px";
            selectedSeatSection.style.height = "58px";

            //**Change the Arrow-img**//
            arrowImage.setAttribute("src", "./Images/arrow-2.svg");
            
            //**Hide Selected-Seats information List**//
            selectedSeatInformationList.style.display = "none";
        }
    }



    //for (768px < Width <= 992px)
    else if (window.matchMedia("(min-width: 768px)" && "(max-width: 992px)").matches) {
        //**Open Section**//
        if (oldHeight == 58) {
            //Calculate the New Hight
            let newHight = 133;
            newHight += ((Math.ceil(numberOfSelectedSeats() / 3) - 1) * 67);
            let newHightMSP = newHight + 159;
           
            //**Replace the Hight**//
            M_S_P_Information.style.height = `${newHightMSP}px`
            selectedSeatSection.style.height = `${newHight}px`;
            
            //**Change the Arrow-img**//
            arrowImage.setAttribute("src", "./Images/arrow-3.svg");
            
            //**Show Selected-Seats information List**//
            M_S_P_Information.style.gridTemplateRows = `${newHight}px 151px`;
            selectedSeatInformationList.style.display = "grid";
        } 

        //**Close Section**//
        else {
            //**Replace the Hight**//
            M_S_P_Information.style.height = "217px";
            selectedSeatSection.style.height = "58px";
            
            //**Change the Arrow-img**//
            arrowImage.setAttribute("src", "./Images/arrow-2.svg");
           
            //**Hide Selected-Seats information List**//
            M_S_P_Information.style.gridTemplateRows = "58px 151px";
            selectedSeatInformationList.style.display = "none";
        }
    }
}



//**Calculate the "grid-template-row" for "selected-seats-information-list" in (992px < Width)**//
const gridTemplateRow = function() {

    let str = "";
    var rowNum = 0;
    if (window.matchMedia("(min-width: 1200px)").matches) {
        rowNum += Math.ceil(numberOfSelectedSeats() / 2);
    } else {
        rowNum += numberOfSelectedSeats();
    }
    for (let i = 1; i <= rowNum; i++) {
        str += "53px ";
    }
    return str;
}






//* ----------Discount Code---------- *//

//**Discount Modal**//
//Open Modal
discountButton.onclick = function() {
    discountModal.style.display = "block";
}
//Close Modal
discountCloseButton.onclick = function() {
    discountModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == discountModal) {
        discountModal.style.display = "none";
    }
}



//**Discount Input Section**//
document.querySelector(".confirm-btn").onclick = function() {
    //To Confirm the Code
    if (discountCodeInput.value === "yasinsahebi") {
        //**Return to the Previous State**//
        discountCodeInput.className = "discount-code";
        discountWarningError.style.visibility = "hidden";

        //**Add Confirmed-img**//
        //Creat Element
        const confirmed = document.createElement("img");
        confirmed.setAttribute("src", "./Images/confimed-discount-img.svg");
        confirmed.setAttribute("alt", "confirmed")
        confirmed.className = "confirmed";
        //Change Confirm-btn
        document.querySelector(".confirm-btn").style.display = "none";
        document.querySelector(".discount-code-input").append(confirmed);
        discountCodeInput.setAttribute("disabled", "yes");

        //**Calculate Discount**//
        discountClac();
    }
    //To not Confirm the Code
    else {
        //**Change Discount-input**//
        discountCodeInput.className = "discount-code discount-error"
        
        //**Show Warning-Error**//
        discountWarningError.style.visibility = "visible";        
    }
}



//**Discount calculation**//
const discountClac = function() {
    if (document.querySelectorAll(".confirmed").length === 1) {
        //Calculate "oldPrice".&."newPrice"
        let oldPrice = document.querySelector("#price").innerHTML;
        let newPrice = oldPrice * 0.8;

        //**Empty the "prices" Element**//
        prices.innerHTML = "";

        //**Add "oldOrice" Element**//
        //Creat Element
        const oldPriceElem = document.createElement("del");
        oldPriceElem.innerHTML = oldPrice;
        oldPriceElem.className = "old-price";
        oldPriceElem.id = "price";
        //append Element
        prices.append(oldPriceElem);

        //**Add "newPrice" Element**//
        //Creat Element
        const newPriceElem = document.createElement("p");
        newPriceElem.innerHTML = `${newPrice} تومان`;
        newPriceElem.className = "new-price";
        //append Element
        prices.append(newPriceElem);
    }
}





//* ----------Press the "Payment-btn"---------- *//

const paymentBtnOnclick = function() {
    //**Convert the "Selected-Seat" to "reserved-seat"**//
    let listOfSelectedSeat = document.querySelectorAll(".selected");
    for (let i = 0; i < listOfSelectedSeat.length; i++) {
        document.getElementById(listOfSelectedSeat[i].id).classList.remove("selected");
        document.getElementById(listOfSelectedSeat[i].id).classList.add("reserved");
    }
    
    //**Capacity Update**//
    document.getElementById("capacity-number").innerHTML = numberOfEptySeats();
    
    //**Empty the "Selected-Seats information List"**//
    selectedSeatInformationList.innerHTML = null;

    //**var(Price) = 0**//
    priceNew = 0;
    document.querySelector("#price").innerHTML = 0;

    //**Selecte-Seats Section Update**//
    selectedSeatInformationSectionShoworHide();

    //**Payment-btn Update**//
    paymentButton.className = ("payment-btn");

    //**Discount-Code Section Update**//
    if (document.querySelectorAll(".confirmed").length === 1) {
        //for Discount-input
        document.querySelector(".confirm-btn").style.display = "block";
        document.querySelector(".discount-code-input").querySelector(".confirmed").remove();
        discountCodeInput.removeAttribute("disabled");
        discountCodeInput.value = "";

        //for Price
        prices.innerHTML = `<p><span id="price">0</span> تومان</p>`
    }
    else if ((discountCodeInput.className === "discount-code discount-error")) {
        //for Discount-input
        discountCodeInput.className = "discount-code";
        discountWarningError.style.visibility = "hidden";
        discountCodeInput.value = "";
    }
    
}





//* ----------Responsive Page with "width-Change"---------- *//

window.onresize = function(){
    //**Show/Hide Selected-Seats information Section**//
    selectedSeatInformationSectionShoworHide();

    //for (width <= 992px)
    if (window.matchMedia("(max-width: 992px)").matches){
        //**Selected-Seats information Section**//
        selectedSeatSection.style.height = "58px";
        selectedSeatInformationList.style.display = "none";
        arrowImage.setAttribute("src", "./Images/arrow-2.svg");
    }
    //for (992px < Width)
    if (window.matchMedia("(min-width: 993px)").matches) {
        //**Discount-Code Section**//
        discountModal.style.display = "block";
    } else {
        discountModal.style.display = "none";
    }
}