import React from 'react';
import cls from './App.module.scss'
import Range from './component/Range';
import PercentageCurrencyHelper from './component/helper/PercentageCurrencyHelper';
import CreateArrayHelper from './component/helper/CreateArrayHelper';

class App extends React.Component {
  state = {
    courseUSD: 1,
    valueСredit: 100,
    valueMonth: 1,
    error: ''
  }

  componentDidMount() {
    const url = 'http://www.nbrb.by/API/ExRates/Rates/145?ParamMode=0'
    fetch(url)
      .then(res => {
        if (res.status !== 200) {
          this.setState({ error: 'ошибка' })
          return;
        }
        res.json().then((res) => {
          this.setState({ courseUSD: res.Cur_OfficialRate })
        })
          .catch(res => {
            this.setState({ error: 'ошибка' })
          })
      })
      .catch(res => {
        this.setState({ error: 'ошибка' })
      })
  }

  render() {
    const { valueСredit, valueMonth, courseUSD, error } = this.state;
    return (
      <div className={cls.main_content}>
        <header>
          Kалькулятор
        </header>
        <div>
          <Range id='credit' onChangeValue={(valueСredit) => this.setState({ valueСredit })} value={valueСredit} text='Сумма кредита ($)' steps={CreateArrayHelper(100, 1000, 100)} />
          <Range id='month' onChangeValue={(valueMonth) => this.setState({ valueMonth })} value={valueMonth} text='Количество месяцев' steps={CreateArrayHelper(1, 12, 1)} />
          <div className={cls.text_container}>
            {!error ?
              <React.Fragment>
                <p>К возврату:</p>
                <p>${PercentageCurrencyHelper('usd', valueСredit, valueMonth, courseUSD)}</p>
                <p>({PercentageCurrencyHelper('', valueСredit, valueMonth, courseUSD)}{' '}бел.руб.)</p>
              </React.Fragment>
              : <p>{error}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
