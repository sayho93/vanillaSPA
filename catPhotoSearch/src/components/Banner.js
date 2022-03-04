export default function Banner({$app, initialState, onChange}) {
    this.state = initialState
    this.onChange = onChange
    this.$target = document.createElement('article')
    this.$target.className = 'slider-container'
    $app.appendChild(this.$target)

    this.index = 1

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.showImage = () => {
        const slides = document.getElementsByClassName('slides')
        const dots = document.getElementsByClassName('dots')
        if (this.index > slides.length) this.index = 1
        if (this.index < 1) this.index = slides.length

        for (let slide of slides) slide.style.display = 'none'
        slides[this.index - 1].style.display = 'block'
        for (let dot of dots) dot.className = dot.className.replace(' active', '')
        dots[this.index - 1].className += ' active'
    }

    this.plusIndex = n => this.showImage((this.index += n))

    this.toIndex = n => this.showImage((this.index = n))

    this.render = () => {
        if (this.state) {
            let template = this.state
                .map(
                    (cat, idx) => /*html */ `
                        <slide class="slides fadeIn">
                            <div class="slider-numbers">${idx + 1}/${this.state.length}</div>
                            <div><img class="slider-image" src="${cat.url}" alt="${cat.name}"></div>
                            <div class="slider-caption">${cat.name}</div>
                        </slide>
                    `
                )
                .join('')
            template += /*html*/ `
                <a class="plusIndex prev" data-value="-1">&#10094;</a>
                <a class="plusIndex next" data-value="1">&#10095;</a>
                
                <div class="slider-bullets" id="slider-bullets">
                    <span class="dots toIndex" data-idx="1"></span>
                    <span class="dots toIndex" data-idx="2"></span>
                    <span class="dots toIndex" data-idx="3"></span>
                    <span class="dots toIndex" data-idx="4"></span>
                    <span class="dots toIndex" data-idx="5"></span>
                </div>
            `
            this.$target.innerHTML = template
            this.index = 1
            this.showImage()
        }

        this.$target.addEventListener('click', event => {
            const plus = event.target.closest('.plusIndex')
            const to = event.target.closest('.toIndex')
            if (plus) {
                this.plusIndex(+plus.dataset.value)
            }
            if (to) {
                this.toIndex(+to.dataset.idx)
            }
        })
    }

    this.render()
}
