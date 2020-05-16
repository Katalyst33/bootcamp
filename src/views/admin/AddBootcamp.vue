<template>
    <div>

        <div class="section">
            <div class="container">
                <div class="has-text-left">
                    <h1 class="is-size-2">Add bootcamp</h1>
                    <p>Important: you must be affiliated with a bootcamp to add to Devcamper</p>

                </div>

                <div class="columns mt-5">

                    <div class="column has-background-white has-text-left">
                        <div>
                            <h1 class="is-size-4">Location & Contact</h1>
                            <p>If multiple locations, use the ,main or largest</p>
                        </div>
                        <section>
                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Text input">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Username</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                                    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
                                    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
                                </div>
                                <p class="help is-success">This username is available</p>
                            </div>

                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
                                    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
                                    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
                                </div>
                                <p class="help is-danger">This email is invalid</p>
                            </div>

                            <div class="field">
                                <label class="label">Subject</label>
                                <div class="control">
                                    <div class="select">
                                        <select>
                                            <option>Select dropdown</option>
                                            <option>With options</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Message</label>
                                <div class="control">
                                    <textarea class="textarea" placeholder="Textarea"></textarea>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox">
                                        I agree to the <a href="#">terms and conditions</a>
                                    </label>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="question">
                                        Yes
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="question">
                                        No
                                    </label>
                                </div>
                            </div>

                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link">Submit</button>
                                </div>
                                <div class="control">
                                    <button class="button is-link is-light">Cancel</button>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div class="column"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  export default {};
</script>

<style scoped>

</style>
