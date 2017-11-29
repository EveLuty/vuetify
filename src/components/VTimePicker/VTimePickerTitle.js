require('../../stylus/components/_time-picker-title.styl')

import pad from '../VDatePicker/util/pad'

export default {
  name: 'v-time-picker-title',

  props: {
    ampm: Boolean,
    selectingHour: Boolean,
    value: String
  },

  computed: {
    hour () {
      return parseInt(this.value.split(':')[0], 10)
    },
    minute () {
      return parseInt(this.value.split(':')[1], 10)
    },
    period () {
      return this.hour < 12 ? 'am' : 'pm'
    }
  },

  methods: {
    genPickerButton (active, click, text) {
      return this.$createElement('span', {
        staticClass: 'picker__title__btn',
        'class': { active },
        on: active ? undefined : { click }
      }, [text])
    },

    genTime () {
      const hour = this.ampm ? (this.hour ? (this.hour % 12) : 12) : this.hour

      return this.$createElement('div', {
        'class': 'time-picker-title__time'
      }, [
        this.genPickerButton(this.selectingHour, () => this.$emit('selectingHour', true), pad(hour)),
        this.$createElement('span', ':'),
        this.genPickerButton(!this.selectingHour, () => this.$emit('selectingHour', false), pad(this.minute))
      ])
    },

    genAMPM () {
      return this.$createElement('div', {
        staticClass: 'time-picker-title__ampm'
      }, [
        this.genPickerButton(this.period === 'am', () => this.$emit('period', 'am'), 'am'),
        this.genPickerButton(this.period === 'pm', () => this.$emit('period', 'pm'), 'pm')
      ])
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'time-picker-title'
    }, [
      this.genTime(),
      this.ampm ? this.genAMPM() : null
    ])
  }
}
