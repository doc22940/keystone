// @flow

import React, { Component, type Ref } from 'react';
import { parse, format, setMonth, setYear } from 'date-fns';
import { DayPicker } from '@voussoir/ui/src/primitives/forms';

const FORMAT = 'YYYY-MM-DD';

type Props = {
  field: Object,
  filter: Object,
  innerRef: Ref<*>,
  onChange: Event => void,
};

export default class CalendarDayFilterView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { value: format(new Date(), FORMAT) };
  }

  handleDayClick = day => {
    const { onChange } = this.props;
    const value = format(day, FORMAT);
    onChange(value);
    this.setState({ value });
  };

  handleMonthSelect = (event, setDate, setSelectedDate) => {
    const { field, onChange } = this.props;
    const month = event.target.value;
    const newDate = setMonth(this.state.value, month);
    const value = format(newDate, 'YYYY-MM-DD');
    setDate(newDate);
    setSelectedDate(newDate);
    this.setState({ value });
    onChange(field, value);
  };

  handleYearSelect = (event, setDate, setSelectedDate) => {
    const { field, onChange } = this.props;
    const year = event.target.value;
    const newDate = setYear(this.state.value, year);
    const value = format(newDate, 'YYYY-MM-DD');
    setDate(newDate);
    setSelectedDate(newDate);
    this.setState({ value });
    onChange(field, value);
  };

  componentDidUpdate(prevProps) {
    const { filter } = this.props;

    if (prevProps.filter !== filter) {
      this.props.recalcHeight();
    }
  }

  render() {
    const { filter } = this.props;

    if (!filter) return null;

    return (
      <DayPicker
        startCurrentDateAt={parse(this.state.value)}
        startSelectedDateAt={parse(this.state.value)}
        onSelectedChange={this.handleDayClick}
        handleYearSelect={this.handleYearSelect}
        handleMonthSelect={this.handleMonthSelect}
      />
    );
  }
}