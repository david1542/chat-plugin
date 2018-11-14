Vue.component('message-create', {
  template: `
    <div class="inputsStructure">
      <h1 class="inputsTitle">Create a new message</h1>
      <div class="inputContainerStructure">
        <div class="inputStructure">
          <input type="text" id="contactus_name" placeholder="Name" style="background-image: url('../assets/profile.svg');" />
        </div>
        <div class="inputStructure" style="margin-right: 0px;">
          <input type="text" id="contactus_company" placeholder="Company" style="background-image: url(../assets/company.svg);" />
        </div>
        <div class="inputStructure">
          <input type="email" id="contactus_email" placeholder="Email" style="background-image: url(../assets/email.svg);" />
        </div>
        <div class="inputStructure" style="margin-right: 0px;">
          <input type="tel" id="contactus_phone" placeholder="Phone Number" style="background-image: url(../assets/phone.svg);" />
        </div>
        <div class="textAreaStructure">
          <textarea type="tel" id="contactus_message" placeholder="Write a message"></textarea>
        </div>
      </div>          
      <div class="submitButton">
        SUBMIT
      </div>
    </div>
  `
})