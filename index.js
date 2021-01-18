const money = [
    { level: 15, amount: '1,000,000' },
    { level: 14, amount: '500,000' },
    { level: 13, amount: '250,000' },
    { level: 12, amount: '100,000' },
    { level: 11, amount: '50,000' },
    { level: 10, amount: '25,000' },
    { level: 9, amount: '16,000' },
    { level: 8, amount: '8,000' },
    { level: 7, amount: '4,000' },
    { level: 6, amount: '2,000' },
    { level: 5, amount: '1,000' },
    { level: 4, amount: '500' },
    { level: 3, amount: '300' },
    { level: 2, amount: '200' },
    { level: 1, amount: '100' },
];

const app = new Vue({
    el: '#layout',
    async created() {
        const URL = 'https://opentdb.com/api.php?amount=15&category=18&type=multiple';
        const res = await fetch(URL);
        const data = await res.json();
        this.questions = data.results    // results right here is the Key in our JSON Url => const URL
        this.displayQ();
        this.displayChoices();

    },
    data: {
        questions: [],
        currentQ: '',
        index: 0,
        answers: [],
        rounds: money,
        isBeginPlay: false,
    },
    watch: {
        index() {
            this.displayQ();
            this.displayChoices();
        }
    },

    methods: {
        isActive(round) {
            if (round === this.index + 1) {
                return true;
            }else {
                return false;
            }

        },

        displayQ() {
            // we are going to set the first question's actual question inside currentQ
            this.currentQ = this.questions[this.index].question
        },
        displayChoices() {
            //we need to merge correct answer with incorrect answers
            this.answers = [this.questions[this.index].correct_answer, ...this.questions[this.index].incorrect_answers]
            //we also need to shuffle the array
            //then assign our shuffled array to our answers
            this.answers.sort(() => 0.5 - Math.random())

        },
        isAnswer(idx) {
            // if our answers[idx] === questions[index].correctAnswer
            if( this.answers[idx] === this.questions[this.index].correct_answer) {
                this.index += 1;
            }else {

                this.isBeginPlay = false;
            }

        },
    }
})






/*
Source:
Watch me do Part 2 of Who Wants to Be a Millionaire:
part 1 (10  mins) - v-if, @click, watch, v-cloak - https://youtu.be/Tm5TBjKr5jU?hd=1
part 2 (8 mins) - figuring out if clicked right answer - https://youtu.be/8bNNYR7KUh0?hd=1
part 3 (2 mins) - keyboard detection - https://youtu.be/jl-Z6z50Grs?hd=1
Feel free to code along using your code from last week
Then apply what you've learned to a similar activity below
 */