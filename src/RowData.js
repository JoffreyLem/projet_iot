import React from 'react'

function TitleCase (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function RowData (props) {
  return (

    <div className='col-lg-4 col-md-6 col-12 mb-3' key={props.id}>
      {console.log("test",props)}
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title text-primary'>Meteo locale !</h2>
          <div className='row'>
            <div className='col-12'>
              <h1 className='field-temp'>{props.data.temp}<span className='temp-unit'>{props.data.temp ? '\u2109' : ''}</span></h1>
            </div>
            <div className='col-12'>
              <h1 className='field-title'>Humidity:</h1>
              <h1 className='field-val'>{props.data.hum}<span className='unit'>{props.data.hum ? '%' : ''}</span></h1>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default RowData
