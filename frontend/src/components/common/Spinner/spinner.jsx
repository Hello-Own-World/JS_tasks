import React from 'react';

import classes from './spinner.css';

const Spinner = ({ loading }) => {
  return (
    <div id='spinner'>
      {loading ? (
        <div className={classes.spinner}>
          <div className='spinner-border text-light'></div>
        </div>
      ) : null}
    </div>
  );
};

export default Spinner;
