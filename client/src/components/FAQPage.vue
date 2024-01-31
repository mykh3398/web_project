<template>
    <div class="container mt-5">
        <h1 class="text-center">Frequently Asked Questions</h1>
        <div class="accordion" id="faqAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading1">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse1">
                        Question 1: How do I get started?
                    </button>
                </h2>
                <div id="collapse1" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        Answer 1: To get started, simply follow the instructions on our website.
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading2">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse2">
                        Question 2: What is FAQ?
                    </button>
                </h2>
                <div id="collapse2" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        Answer 2: FAQ stands for Frequently Asked Questions, which contains answers to common queries.
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading3">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse3">
                        Question 3: How can I edit my question and answer?
                    </button>
                </h2>
                <div id="collapse3" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        Answer 3: To edit questions and answers, you can modify the HTML code of this page.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FAQPage'
}
</script>