import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ['items', 'form']
  static values = { position: String}
  connect() {
    // console.log('i am connected');
    // console.log('my form', this.formTarget);
    // console.log('my items', this.itemsTarget);
    // console.log('my controller', this.element);
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content")
  }

  send(event) {
    event.preventDefault()
    const url = this.formTarget.action
    const options = {
      method: "POST",
      headers: {"Accept": "application/json", "X-CSRF-Token": this.csrfToken },
      body: new FormData(this.formTarget)
    }
    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        // insert the review inside of the list of items at the end
        if (data.inserted_item) {
          this.itemsTarget.insertAdjacentHTML((this.positionValue), data.inserted_item )
        }
        this.formTarget.outerHTML = data.form
      })
  }
}
