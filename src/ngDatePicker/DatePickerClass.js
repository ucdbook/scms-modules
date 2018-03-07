import moment from 'moment';

var initYear = Array.apply(null, Array(12)).map(function(item, i) {
  return i - 1;
});
function monthMap(month) {
  let map = {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
    "10": "十",
    "11": "十一",
    "12": "十二",
  };
  return map[month];
}
function getDate(date) {
  date = parseInt(date, 10);
  if ("number" === typeof date) {
    date = date * 24 * 60 * 60 * 1000;
    var newDateA = +new Date() + date;
    return new Date(newDateA);
  } else if (date) {
    return date;
  }
}
class DatePicker {
  constructor(args) {
    Object.assign(this, args);
    this.maxDateArr = {};
    this.minDateArr = {};
    this.dateData = {};
    this.showPanel = 'day';
  }
  init(date) {
    this.dateData = {};
    this.dateData.year = moment(date).year();
    this.dateData.month = moment(date).month() + 1;
    this.dateData.date = moment(date).date();
    this.dateData.hour = moment(date).hour();
    this.dateData.minute = moment(date).minute();
    this.dateData.second = moment(date).second();
    this.setYearView(this.dateData.year);
    this.setMonthView();
    this.setDateView(date);
    this.setHourView();
    this.setMinView();
    this.setSecondView();
  }
  setYearView(year = moment().year()) {
    if (!this.dateData.year) {
      this.dateData.year = moment().year();
    }
    let decade = Math.floor(year / 10) * 10;
    this.yearView = initYear.map((data, index) => {
      let thisYear = data + decade;
      return {
        data: thisYear,
        checked: this.dateData && this.dateData.year === thisYear,
        disabled:
          thisYear < this.minDateArr.year ||
          thisYear > this.maxDateArr.year,
      };
    });
  }
  setPreDecade() {
    if (!this.yearView[0].disabled) {
      this.setYearView(this.yearView[0].data - 1);
    }
  }
  setNextDecade() {
    if (!this.yearView[11].disabled) {
      this.setYearView(this.yearView[11].data + 1);
    }
  }
  setYear(year) {
    if (!year.disabled) {
      this.dateData.year = year.data;
      this.setYearView(year.data);
      if (
        this.dateData.year === this.minDateArr.year &&
        this.dateData.month < this.minDateArr.month
      ) {
        this.dateData.month = this.minDateArr.month;
      }
      if (
        this.dateData.year === this.maxDateArr.year &&
        this.dateData.month > this.maxDateArr.month
      ) {
        this.dateData.month = this.maxDateArr.month;
      }
      this.setMonthView();
      this.showPanel = "month";
    }
  }
  setMonthView() {
    if (!this.dateData.month) {
      this.dateData.month = moment().month() + 1;
    }

    this.monthView = Array.apply(null, Array(12)).map((item, i) => {
      var thisMonth = i + 1;
      return {
        data: thisMonth,
        dataView: monthMap(thisMonth),
        checked: thisMonth === this.dateData.month,
        today:
          this.dateData.year == moment().year() &&
          i == moment().month(),
        disabled:
          moment([
            this.minDateArr.year,
            this.minDateArr.month - 1,
          ]).valueOf() > moment([this.dateData.year, i]).valueOf() ||
          moment([
            this.maxDateArr.year,
            this.maxDateArr.month - 1,
          ]).valueOf() < moment([this.dateData.year, i]).valueOf(),
      };
    });
    if (this.minDateArr.year && this.minDateArr.month) {
      this.monthView.prevYear =
        moment([
          this.minDateArr.year,
          this.minDateArr.month - 1,
        ]).valueOf() < moment([this.dateData.year, 0]).valueOf();
    } else {
      this.monthView.prevYear = true;
    }
    if (this.maxDateArr.year && this.maxDateArr.month) {
      this.monthView.nextYear =
        moment([
          this.maxDateArr.year,
          this.maxDateArr.month - 1,
        ]).valueOf() > moment([this.dateData.year, 11]).valueOf();
    } else {
      this.monthView.nextYear = true;
    }
  }
  setMonth(month) {
    if (!month.disabled) {
      this.dateData.month = month.data;
      this.setMonthView();
      this.setDateView(
        moment([this.dateData.year, this.dateData.month - 1])
      );
      if (this.minViewMode === "months") {
        return;
      }
      this.showPanel = "day";
    }
  }

  setDateView(date) {
    if (!this.dateData.date) {
      this.dateData.date = moment().date();
    }
    var dateView = [];
    var startDate = moment(date)
      .date(1)
      .weekday(0);
    var month = moment(date).month();
    if (
      (this.minDateArr.year&&
      this.minDateArr.month&&
      this.minDateArr.date)
    ) {
      dateView.prevMonth =
        moment([
          this.minDateArr.year,
          this.minDateArr.month - 1,
          this.minDateArr.date,
        ]).valueOf() <
        moment(date).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf();
    } else {
      dateView.prevMonth = true;
    }
    if (
      this.maxDateArr.year &&
      this.maxDateArr.month &&
      this.maxDateArr.date
    ) {
      dateView.nextMonth =
        moment([
          this.maxDateArr.year,
          this.maxDateArr.month - 1,
          this.maxDateArr.date,
        ]).valueOf() >
        moment(date).add(1, "month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf();
    } else {
      dateView.nextMonth = true;
    }
    if (
      (this.minDateArr.year,
      this.minDateArr.month,
      this.minDateArr.date)
    ) {
      dateView.prevYear =
        moment([
          this.minDateArr.year,
          this.minDateArr.month - 1,
          this.minDateArr.date,
        ]).valueOf() <
        moment(date)
          .add(-1, "year")
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .valueOf();
    } else {
      dateView.prevYear = true;
    }
    if (
      this.maxDateArr.year &&
      this.maxDateArr.month &&
      this.maxDateArr.date
    ) {
      dateView.nextYear =
        moment([
          this.maxDateArr.year,
          this.maxDateArr.month - 1,
          this.maxDateArr.date,
        ]).valueOf() >
        moment(date)
          .add(1, "year")
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .valueOf();
    } else {
      dateView.nextYear = true;
    }

    let minMomentValue = (this.dateRange||this.weekPick)? this.minDateArr.data&&this.minDateArr.data.valueOf():
        moment([this.minDateArr.year, this.minDateArr.month - 1, this.minDateArr.date, ]).valueOf(),
        maxMomentValue =  (this.dateRange||this.weekPick)? this.maxDateArr.data&&this.maxDateArr.data.valueOf():
        moment([this.maxDateArr.year,this.maxDateArr.month - 1, this.maxDateArr.date,]).valueOf(),
        weekPickStartValue = this.weekPickerData.start&&this.weekPickerData.start.valueOf(),
        weekPickEndValue = this.weekPickerData.end&&this.weekPickerData.end.clone().hour(0).minute(0).second(0).millisecond(0).valueOf();

    for (var i = 0; i < 42; i++) {
      var nowDate = startDate
        .clone()
        .add(i, "day")
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);
      var tag = "now";
      if (
        nowDate.valueOf() <
        moment(date)
          .date(1)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .valueOf()
      ) {
        tag = "old";
      }
      if (
        nowDate.valueOf() >=
        moment(date)
          .add(1, "month")
          .date(1)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .valueOf()
      ) {
        tag = "new";
      }
      if (
        nowDate.valueOf() ===
        moment()
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .valueOf()&&
          (tag !== 'new'&&tag !== 'old')
      ) {
        tag = "today";
      }
      if (this.dateRange) {
        if (
          this.dateRangeData &&
          ((this.dateRangeData.start &&
            (tag === "now" || tag === "today") &&
            nowDate.valueOf() ===
              this.dateRangeData.start
                .hour(0)
                .minute(0)
                .second(0)
                .millisecond(0)
                .valueOf()) ||
            (this.dateRangeData.end &&
              (tag === "now" || tag === "today") &&
              nowDate.valueOf() ===
                this.dateRangeData.end
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .millisecond(0)
                  .valueOf()))
        ) {
          tag = "hover";
        }
       
      } else if (this.weekPick) {

      }else {
        if (
          nowDate.valueOf() ===
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
          ])
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .valueOf()
        ) {
          tag = "active";
        }
      }
      if (
        this.dateRange &&
        this.tmpDate &&
        (tag === "now" || tag === "today")
      ) {
        if (
          nowDate.valueOf() ===
          this.tmpDate
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .valueOf()
        ) {
          tag = "hover";
        }
      }
      var range = false;
      if (
        this.dateRange &&
        this.tmpDate &&
        (tag === "now" || tag === "today")
      ) {
        if (
          this.dateRangeData &&
          this.dateRangeData.start &&
          !this.dateRangeData.end
        ) {
          if (
            nowDate.valueOf() > this.dateRangeData.start.valueOf() &&
            nowDate.valueOf() < this.tmpDate.valueOf()
          ) {
            range = true;
          }
          if (
            nowDate.valueOf() < this.dateRangeData.start.valueOf() &&
            nowDate.valueOf() > this.tmpDate.valueOf()
          ) {
            range = true;
          }
        }
      }
      if (
        this.dateRangeData &&
        this.dateRangeData.start &&
        this.dateRangeData.end &&
        (tag === "now" || tag === "today")
      ) {
        if (
          nowDate.valueOf() > this.dateRangeData.start.valueOf() &&
          nowDate.valueOf() < this.dateRangeData.end.valueOf()
        ) {
          range = true;
        }
      }
      let weekStart, weekBetween, weekEnd;
      if (this.weekPick) {
        if (nowDate.valueOf() === weekPickStartValue) {
          weekStart = true;
        } else if ((nowDate.valueOf() > weekPickStartValue)&&(nowDate.valueOf()<weekPickEndValue)) {
          weekBetween = true;
        } else if(nowDate.valueOf() === weekPickEndValue) {
          weekEnd = true;
        }
      }
      if (nowDate.day() === 0) {
        dateView.push([
          {
            tag: tag || "now",
            value: nowDate.date(),
            data: nowDate,
            range,
            weekStart,
            weekBetween,
            weekEnd,
            disabled: minMomentValue > nowDate.valueOf() ||maxMomentValue < nowDate.valueOf(),
          },
        ]);
        dateView[dateView.length - 1].week = nowDate.week();
      } else {
        dateView[dateView.length - 1].push({
          tag: tag || "now",
          value: nowDate.date(),
          data: nowDate,
          range,
          weekStart,
          weekBetween,
          weekEnd,
          disabled: minMomentValue > nowDate.valueOf() ||maxMomentValue < nowDate.valueOf(),
        });
      }
    }
    this.dateView = dateView;
    return dateView;
  }
  setDate(momentDate) {
    if (!momentDate.disabled) {
      if (this.weekPick) {
        if (momentDate.data.clone().startOf('week').valueOf() < this.minDateArr.data&&this.minDateArr.data.valueOf()) {
          return;
        }
        if (momentDate.data.clone().endOf('week').valueOf() > this.maxDateArr.data&&this.maxDateArr.data.valueOf()) {
          return;
        }
        this.weekPickerData.start = momentDate.data.clone().startOf('week');  
        this.weekPickerData.end = momentDate.data.clone().endOf('week');
        this.weekPickerData.week =  momentDate.data.clone().week();
      }
      this.dateData.date = momentDate.data.date();
      this.dateData.month = momentDate.data.month() + 1;
      this.dateData.year = momentDate.data.year();
      if (this.dateRange) {
        if (
          (this.dateRangeData.start && this.dateRangeData.end) ||
          (!this.dateRangeData.start && !this.dateRangeData.end)
        ) {
          this.dateRangeData.start = momentDate.data;
          this.dateRangeData.end = null;
          this.refresh = new Date().getTime();
        } else if (this.dateRangeData.start && !this.dateRangeData.end) {
          if (
            this.dateRangeData.start &&
            this.dateRangeData.start.valueOf() >
              momentDate.data.valueOf()
          ) {
            this.dateRangeData.end = this.dateRangeData.start.clone();
            this.dateRangeData.start = momentDate.data;
          } else if (
            this.dateRangeData.start &&
            this.dateRangeData.start.valueOf() <
              momentDate.data.valueOf()
          ) {
            this.dateRangeData.end = momentDate.data;
          } else {
            this.dateRangeData.start = momentDate.data;
          }
        }
      }
      this.setDateView(momentDate.data);
      this.setMonthView();
      this.setYearView(this.dateData.year);
      this.setHourView();
      this.setMinView();
      this.setSecondView();
    }
  }
  setPrevMonth() {
    if (this.dateView.prevMonth) {
      var prevMonth;
      if (
        this.minDateArr.year &&
        this.minDateArr.month &&
        this.minDateArr.date
      ) {
        prevMonth =
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
          ])
            .add(-1, "month")
            .valueOf() >
          moment([
            this.minDateArr.year,
            this.minDateArr.month - 1,
            this.minDateArr.date,
          ]).valueOf()
            ? moment([
                this.dateData.year,
                this.dateData.month - 1,
                this.dateData.date,
              ]).add(-1, "month")
            : moment([
                this.minDateArr.year,
                this.minDateArr.month - 1,
                this.minDateArr.date,
              ]);
      } else {
        prevMonth = moment([
          this.dateData.year,
          this.dateData.month - 1,
          this.dateData.date,
        ]).add(-1, "month");
      }
      this.dateData.date = prevMonth.date();
      this.dateData.month = prevMonth.month() + 1;
      this.setMonthView();
      if (prevMonth.year() !== this.dateData.year) {
        this.dateData.year = prevMonth.year();
        this.setYearView(this.dateData.year);
      }
      this.setDateView(prevMonth);
    }
  }
  setNextMonth() {
    if (this.dateView.nextMonth) {
      var nextMonth;
      if (
        this.maxDateArr.year &&
        this.maxDateArr.month &&
        this.maxDateArr.date
      ) {
        nextMonth =
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
          ])
            .add(1, "month")
            .valueOf() <
          moment([
            this.maxDateArr.year,
            this.maxDateArr.month - 1,
            this.maxDateArr.date,
          ]).valueOf()
            ? moment([
                this.dateData.year,
                this.dateData.month - 1,
                this.dateData.date,
              ]).add(1, "month")
            : moment([
                this.maxDateArr.year,
                this.maxDateArr.month - 1,
                this.maxDateArr.date,
              ]);
      } else {
        nextMonth = moment([
          this.dateData.year,
          this.dateData.month - 1,
          this.dateData.date,
        ]).add(1, "month");
      }

      this.dateData.date = nextMonth.date();
      if (this.dateData.year !== nextMonth.year()) {
        this.dateData.year = nextMonth.year();
        this.setYearView(this.dateData.year);
      }
      this.dateData.month = nextMonth.month() + 1;
      this.setMonthView();
      this.setDateView(nextMonth);
    }
  }
  setPreYear(type) {
    if (type === "day" && !this.dateView.prevYear) {
      return;
    }
    if (!type && !this.monthView.prevYear) {
      return;
    }
    this.dateData.year -= 1;
    if (this.dateData.year === this.minDateArr.year) {
      this.dateData.month =
        this.dateData.month > this.minDateArr.month
          ? this.dateData.month
          : this.minDateArr.month;
    }
    this.yearView = this.dateData.year;
    this.setYearView(this.dateData.year);
    this.setMonthView();
    this.setDateView(
      moment([this.dateData.year, this.dateData.month - 1, 1])
    );
  }
  setNextYear(type) {
    if (type === "day" && !this.dateView.nextYear) {
      return;
    }
    if (!type && !this.monthView.nextYear) {
      return;
    }
    this.dateData.year += 1;
    if (this.dateData.year === this.maxDateArr.year) {
      this.dateData.month =
        this.dateData.month < this.maxDateArr.month
          ? this.dateData.month
          : this.maxDateArr.month;
    }
    this.yearView = this.dateData.year;
    this.setYearView(this.dateData.year);
    this.setMonthView();
    this.setDateView(
      moment([this.dateData.year, this.dateData.month - 1, 1])
    );
  }
  setMinDate(date) {
    var time = moment(date);
    this.hasMinDate = true;
    this.minDateArr = {
      year: time.year(),
      month: time.month() + 1,
      date: time.date(),
      hour: time.hour(),
      minute: time.minute(),
      second: time.second(),
      data: time,
    };
  }
  setMaxDate(date) {
    var time = moment(date);
    this.hasMaxDate = true;
    this.maxDateArr = {
      year: time.year(),
      month: time.month() + 1,
      date: time.date(),
      hour: time.hour(),
      minute: time.minute(),
      second: time.second(),
      data: time,
    };
  }
  setHourView() {
    if (!this.dateData.hour) {
      this.dateData.hour = moment().hour();
    }
    this.hourView = Array.apply(null, Array(24)).map((item, i) => {
      return {
        value: (i / 100)
          .toFixed(2)
          .toString()
          .slice(2),
        active: i === Number(this.dateData.hour),
        disabled:
          moment([
            this.minDateArr.year,
            this.minDateArr.month - 1,
            this.minDateArr.date,
            this.minDateArr.hour,
          ]).valueOf() >
            moment([
              this.dateData.year,
              this.dateData.month - 1,
              this.dateData.date,
              i,
            ]).valueOf() ||
          moment([
            this.maxDateArr.year,
            this.maxDateArr.month - 1,
            this.maxDateArr.date,
            this.maxDateArr.hour,
          ]).valueOf() <
            moment([
              this.dateData.year,
              this.dateData.month - 1,
              this.dateData.date,
              i,
            ]).valueOf(),
      };
    });
    for(let i = 1, len = this.hourView.length; i<len; i++) {
      if (!this.hourView[i].disabled&&this.hourView[i-1].disabled) {
        this.hourView[i].first = true;
      }
      if (this.hourView[i].disabled&&!this.hourView[i-1].disabled) {
        this.hourView[i-1].last  = true;
      } 
    }
  }
  setHour(hour) {
    if (!hour.disabled&&(hour.value!= this.dateData.hour)) {
      this.dateData.hour = hour.value;
      this.setHourView();
      if (this.hasMinDate||this.hasMaxDate) {
        this.setMinView();
        this.setSecondView();
      }
    }
  }
  setMinView() {
    if (!this.dateData.minute) {
      this.dateData.minute = moment().minute();
    }
    let minMomentValue = moment([this.minDateArr.year, this.minDateArr.month - 1, this.minDateArr.date, this.minDateArr.hour,this.minDateArr.minute, ]).valueOf(),
        maxMomentValue = moment([this.maxDateArr.year, this.maxDateArr.month - 1, this.maxDateArr.date, this.maxDateArr.hour, this.maxDateArr.minute, ]).valueOf(),
        nowMomentValue = moment([this.dateData.year, this.dateData.month - 1, this.dateData.date, this.dateData.hour, this.dateData.minute,]).valueOf();
    if ( nowMomentValue<minMomentValue ) {
      this.dateData.minute = this.minDateArr.minute;
    } else if ( nowMomentValue > maxMomentValue ) {
      this.dateData.minute = this.maxDateArr.minute;
    }  
    this.minView = Array.apply(null, Array(60)).map((item, i) => {
      return {
        value: (i / 100)
          .toFixed(2)
          .toString()
          .slice(2),
        active: i === Number(this.dateData.minute),
        disabled: minMomentValue >
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
            this.dateData.hour,
            i,
          ]).valueOf() || maxMomentValue <
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
            this.dateData.hour,
            i,
          ]).valueOf(),
      };
    });
    for(let i = 1, len = this.minView.length; i<len; i++) {
      if (!this.minView[i].disabled&&this.minView[i-1].disabled) {
        this.minView[i].first = true;
      }
      if (this.minView[i].disabled&&!this.minView[i-1].disabled) {
        this.minView[i-1].last  = true;
      } 
    }

  }
  setMinute(minute) {
    if (!minute.disabled&&(minute.value != this.dateData.minute)) {
      this.dateData.minute = minute.value;
      this.setMinView();
      if (this.hasMaxDate||this.hasMinDate) {
        this.setSecondView();
      }
    }
  }
  setSecondView() {
    if (!this.dateData.second) {
      this.dateData.second = moment().second();
    }
    let minMomentValue = moment([this.minDateArr.year, this.minDateArr.month - 1, this.minDateArr.date, this.minDateArr.hour,this.minDateArr.minute, this.minDateArr.second]).valueOf(),
        maxMomentValue = moment([this.maxDateArr.year, this.maxDateArr.month - 1, this.maxDateArr.date, this.maxDateArr.hour, this.maxDateArr.minute, this.maxDateArr.second]).valueOf(),
        nowMomentValue = moment([this.dateData.year, this.dateData.month - 1, this.dateData.date, this.dateData.hour, this.dateData.minute, this.dateData.second]).valueOf();
    if ( nowMomentValue<minMomentValue ) {
      this.dateData.second = this.minDateArr.second;
    } else if ( nowMomentValue > maxMomentValue ) {
      this.dateData.second = this.maxDateArr.second;
    } 
    this.secondView = Array.apply(null, Array(60)).map((item, i) => {
      return {
        value: (i / 100)
          .toFixed(2)
          .toString()
          .slice(2),
        active: i == Number(this.dateData.second),
        disabled:
        moment([
          this.minDateArr.year,
          this.minDateArr.month - 1,
          this.minDateArr.date,
          this.minDateArr.hour,
          this.minDateArr.minute,
          this.minDateArr.second,
        ]).valueOf() >
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
            this.dateData.hour,
            this.dateData.minute,
            i,
          ]).valueOf() ||
        moment([
          this.maxDateArr.year,
          this.maxDateArr.month - 1,
          this.maxDateArr.date,
          this.maxDateArr.hour,
          this.maxDateArr.minute,
          this.maxDateArr.second,
        ]).valueOf() <
          moment([
            this.dateData.year,
            this.dateData.month - 1,
            this.dateData.date,
            this.dateData.hour,
            this.dateData.minute,
            i,
          ]).valueOf(),
      };
    });
    for(let i = 1, len = this.secondView.length; i<len; i++) {
      if (!this.secondView[i].disabled&&this.secondView[i-1].disabled) {
        this.secondView[i].first = true;
      }
      if (this.secondView[i].disabled&&!this.secondView[i-1].disabled) {
        this.secondView[i-1].last  = true;
      } 
    }
    
  }
  setSecond(second) {
    if (!second.disabled&&(second.value != this.dateData.second)) {
      this.dateData.second = second.value;
      this.setSecondView();
    }
  }
  getResult() {
    return moment()
    .set("year", this.dateData.year || moment().year())
    .set(
      "month",
      typeof this.dateData.month === "number"
        ? this.dateData.month - 1
        : moment().month()
    )
    .set("date", this.dateData.date || moment().date())
    .set("hour", this.dateData.hour || moment().hour())
    .set("minute", this.dateData.minute || moment().minute())
    .set("second", this.dateData.second || moment().second())
    .format(this.formatDate || "YYYY-MM-DD");
  }
}

export default DatePicker;