const config = require('./config.json');


const getLrcFeePercentage = () => {
  return config.lrcFeePercent
};

export default {
  getLrcFeePercentage
}
