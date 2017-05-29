window.onload = function() {
  var vm = new Vue({
    el: "#app",
    data: {
      tags: "日一二三四五六",
      days: [],
      selected_day: 0,
      start_day: 0,
      year: '',
      month: ''
    },
    mounted() {
      var date = new Date()

      this.year = date.getFullYear()

      /** Get the month  */
      this.month = (date.getMonth() + 1) % 12

      /** Get the started day of the week */
      this.start_day = new Date(this.year, this.month - 1, 1).getDay()

      this.days = []

      /** Get the number of days of month */
      var end_of_day = new Date(this.year, this.month, 0).getDate()

      for (var i = 1; i <= end_of_day; i++) {
        var new_day = {
          number: i,
          events: []
        }
        if (Math.random() < 0.4) {
          var count = Math.random() * 3;
          var minute = parseInt((Math.random() * 3) * 15)
          for (var j = 0; j < count; j++) {
            new_day.events.push({
              title: ["整理房間", "丟垃圾", "打包行李"][parseInt(Math.random() * 3)],
              time: parseInt(Math.random() * 24) + ":" + (minute == 0 ? '0' : '') + minute
            })
          }
        }
        this.days.push(new_day)
      }
    },
    methods: {
      get_padding(id) {
        if (id != 0) {
          return null;
        } else {
          return { 'margin-left': 'calc(' + this.start_day + ' * 100% / 7 )' };
        }
      },
      previous_month(now_year, now_month) {
        this.year = ((now_month - 1) != 0 ? now_year : now_year - 1)

        /** Get the previous month  */
        this.month = ((now_month - 1 + 12) != 12 ? (now_month - 1 + 12) % 12 : 12)

        /** Get the started day of the week */
        this.start_day = new Date(this.year, this.month - 1, 1).getDay()

        this.days = []
          /** Get the number of days of previous month */
        var end_of_day = new Date(this.year, this.month, 0).getDate()

        /** Insert the number of days of previous month */
        for (var i = 1; i <= end_of_day; i++) {
          var new_day = {
            number: i,
            events: []
          }
          this.days.push(new_day)
        }
      },
      next_month(now_year, now_month) {
        /** Get the next month  */
        this.month = ((now_month + 1) != 12 ? (now_month + 1) % 12 : 12)

        this.year = now_year + ((now_month + 1) != 12 ? parseInt((now_month + 1) / 12) : 0)

        /** Get the started day of the week */
        this.start_day = new Date(this.year, this.month - 1, 1).getDay()

        this.days = []
          /** Get the number of days of previous month */
        var end_of_day = new Date(this.year, this.month, 0).getDate()

        /** Insert the number of days of next month */
        for (var i = 1; i <= end_of_day; i++) {
          var new_day = {
            number: i,
            events: []
          }
          this.days.push(new_day)
        }
      }
    },
    computed: {
      now_events() {
        var day = this.days[this.selected_day]
        if (day)
          return day.events
        else
          return null
      }
    }
  })
}


// $(document).ready(function() {
//   console.log($(".infos").width())
//   $(".num").css({ "height": $(".num").width(), "line-height": $(".num").width() + "px" })
// })
