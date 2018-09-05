const words = {
  all: 'All',
  time: 'Time',
  status: 'Status',
  statuses: 'Statuses',
  side: 'Side',
  sides: 'Sides',
  market: 'Market',
  markets: 'Markets',
  amount: 'Amount',
  type: 'Type',
  types: 'Types',
  gas: 'Gas',
  price: 'Price',
  total: 'Total',
  advanced: "Advanced",
  worth: "Worth",
  lrc_fee: 'Trading Fee',
  lrc_fee_tips: 'xxxxx',
  lrc_reward: 'LRC Reward',
  lrc_reward_tips: 'xxxxx',
  ttl: 'Time to Live',
  block: 'Block',
  nonce: 'Nonce',
  sell: 'Sell',
  buy: 'Buy',
  sell_short: 'S',
  buy_short: 'B',
  buying: "You are buying",
  selling: "You are selling",
  actions: 'Actions',
  options: 'Options',
  balance: 'Balance',
  balances: 'Balances',
  send: 'Send',
  receive: 'Receive',
  convert: 'Convert',
  trade: 'Trade',
  password: 'Password',
  copy: "Copy",
  copy_suc: 'Copy Successfully',
  copy_fail: "Copy Failed",
  token: 'Token',
  margin_split: "Margin Split",
  format_amount: "{amount,number}",
  back: 'Return',
  cancel: 'Cancel',
  ok:" OK",
  previous_page: 'Previous Page',
  next_page: 'Next Page',
  import: "Import",
  recipient: 'Recipient',
  help:'Help',
  feedback:"Feedback",
  quit:'Quit',
  asset:'Asset',
  assets:'Assets',
  order:'Order',
  orders:'Orders',
  fill:'Fill',
  fills:'Fills',
  yes:'Yes',
  no:'No',
  more:'More',
  comingsoon:'Coming Soon',
  depth:'Depth',
  set:'Set',
  helper:'Helper',
  list:{
    no_data:'No Data',
    no_data_custom:'No {title}',
    loading:'Loading...',
  }
}
const types = {
  trade_side: {
    sell: words.sell,
    buy: words.buy,
  },
};

const validation_messages = {
  invalid_number: "Please provide a valid number value",
  invalid_integer: 'Please provide an integer value',
  token_not_select: "Please select token",
  invalid_eth_address: "Invalid Ethereum address",
  invalid_item: "Please provide a valid {item}"
}

const notifications = {
  title: {
    place_order_failed: "Whoops, order submission somehow failed!",
    place_order_success: "Order placed successfully.",
    place_order_warn: "Your order can not be fully filled.",
    unlock_suc: 'Unlock Successfully',
    unlock_fail: "Unlock Failed",
    to_confirm: "Waiting For Your Confirmation",
    send_failed: 'Send Failed !',
    send_succ: 'Transfer Succeeded!',
    copy_suc: 'Copy Successfully',
    copy_fail: 'Copy Failed',
    not_allowed_place_order_worth: 'Order Amount Is Too Small',
    in_watch_only_mode:'Switched to Watch-only Mode',
    using_watch_only_mode:'You Are Now using Watch-only Mode',
    cancel_suc:'{type} Cancel Successfully',
    cancel_fail:'{type} Cancel Failed',
    invalid_number:'Please input valid number',
    convert_suc:'Convert Successfully',
    convert_fail:'Convert Failed',
    enable_suc:'Enable Successfully',
    enable_fail:'Enable failed',
    place_order_price_confirm:"Are you sure you want to continue ?",
  },
  message: {
    place_order_price_high:"Your price is 20% higher than the market price.",
    place_order_price_low:"Your price is 20% lower than the market price.",
    wallet_locked: 'Your wallet seems locked yet, please unlock first',
    failed_fetch_data_from_server: 'Failed fetch data from server, you could wait a moment and come back later',
    eth_is_required_when_place_order: 'ETH is required to pay Ethereum transaction fees, calculated with your current order cost that need to send Ethereum transactions, totally required {required} ETH.',
    lrcfee_is_required_when_place_order: 'LRC is required to pay trade fees, added on your history orders need LRC, totally required {required} LRC.',
    some_items_not_signed: "You may have some items not signed, please signed all items then continue",
    place_order_success: 'Good job. Your order has been submitted for ring-matching.',
    place_order_balance_not_enough: 'In order for your order to be fully filled, {amount} more {token} is required.',
    confirm_warn_ledger: "Please confirm transaction on your Ledger device, then come back to continue",
    confirm_warn_trezor: "Please confirm transaction on your Trezor device , then come back to continue",
    confirm_warn_metamask: "Please confirm transaction on your MetaMask browser extension, then come back to continue",
    send_failed: "Your have failed {do} {amount} {token} - {reason}",
    send_succ: "You have successfully send {amount} {token}",
    not_allowed_place_order_worth: 'Due to your total worth less than {worth}, you could not place this order',
    eth_is_required: 'ETH is required to pay Ethereum transaction fees, calculated with your current order cost that need to send Ethereum transactions, totally required {required} ETH.',
    lrcfee_is_required: 'LRC is required to pay trade fees, added on your history orders need LRC, totally required {required} LRC.',
    unlock_by_cookie_address:'Loopr has switched your account to the watch-only mode, and your private-key is no longer available to the browser.  You\'ll need to unlock your wallet again to perform some operations.',
  }
}

const actions = {
  resend: 'Resend',
  receive: "Receive",
  submit_order: 'Submit Order',
  generate_qrcode: 'Generate QR Code',
  reset: 'Reset',
  continue: 'Continue',
  to_unlock: 'To Unlock',
  transfer_cancel: "No, Cancel It",
  transfer_send: "Yes, Send Now",
  place_buy_order: "Place Buy Order",
  place_sell_order: "Place Sell Order",
  all_assets: "All Assets",
  fills_of_all_markets: "Fills of all markets"
}

const time_unit = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
}

export default {
  common: {
    ...words,
    ...validation_messages,
    ...time_unit,
  },
  notifications,
  actions,
  // -----------
  // order
  // -----------
  order: {
    hash: 'Order Hash',
    market: words.market,
    side: words.side,
    amount: words.amount,
    price: words.price,
    total: words.total,
    LRCFee: words.lrc_fee,
    marginSplit: words.margin_split,
    filled: 'Filled',
    filled_total: 'Filled/Total',
    validSince: 'Valid Since',
    validUntil: 'Valid Until',
    status: words.status,
  },
  order_type: {
    market_order: 'Open Market Order',
    p2p_order: 'Privacy P2P Order'
  },
  order_status: {
    opened: 'Open',
    completed: 'Completed',
    canceled: 'Canceled',
    expired: 'Expired',
    pending: "Pending",
    canceling: "Canceling"
  },
  order_side: {
    sell: words.sell,
    buy: words.buy,
  },
  order_list: {
    actions_cancel_all: 'Cancel All',
    my_open_orders:'Open Orders',
    my_all_orders:'All Orders',
    order_book:'Order Book',
    no_open_orders: "No open orders of {market}",
    view_all_orders: "View all orders"
  },
  order_detail: {
    title: 'Order Detail',
    tabs_basic: 'Order Detail',
    tabs_fills: 'Order Fills',
    tabs_logs: 'Order Logs',
  },
  place_order: {
    title: 'Place Order',
    order_type: 'Order Type',
    order_since: "Valid Since",
    order_until: "Valid Until",
    depth:'Depth',
    assets: "Assets",
    orders: "Orders",
    fills: "Fills",
    help: "Help"
  },
  order_cancel: {
    cancel_title: "Do you want to cancel this order?",
    cancel_all_title: "Cancel all {market} orders ?",
    cancel_all_mes:'{amount,number} open {market} orders will be canceled',
    no_open_orders:'No open orders to cancel',
    confirm_yes:'Yes, cancel order',
    confirm_no:words.no
  },
  helper_of_amount: {
    depth: "Depth"
  },
  helper_of_market_order: {
    selling: "Selling",
    no_fills_of_market: "No fills of {market}",
  },
  helper_of_balance: {
    description: "We only show your {pair} assets at current page"
  },
  settings: {
    title: 'Settings',
    preferences: 'Preferences',
    tradings: 'Tradings',
    relays: 'Relays',
    language: 'Language',
    currency: 'Currency',
    timezone: 'Timezone',
    select_placeholder: 'Search/Select',
    time_to_live: 'Order Time-To-Live',
    trading_fee: 'Trading Fee (LRC)',
    margin_split: 'Default Margin Split',
    gas_price: 'Default Gas Price',
    choose_relay: 'Choose Relay'
  },
  gas_setting: {
    title: 'Set Gas Fee',
    gas_selector_last: 'Last use',
    gas_selector_estimate: 'Estimate',
    gas_selector_custom: 'Custom Gas',
    mode_easy_title: 'Recommended',
    mode_advanced_title: 'Advanced',
    gas_limit: 'Gas Limit',
    gas_price: 'Gas Price',
    gas_fee: 'Gas Fee',
    none: 'None'
  },
  setting_ttl: {
    title: 'Set Time To Live Of Order',
    tabs_basic: 'Basic',
    tabs_advanced: 'Advanced',
    more: 'More',
    input_place_holder: 'We recommend to set it between 1 hour and 1 day.',
  },
  setting_lrcfee: {
    title: 'Set LRC Fee Of Order',
    tabs_basic: 'Basic',
    tabs_advanced: 'Advanced',
  },
  place_order_confirm: {
    qrcode_security: '*For your order\'s security, your QR code will only generated once and not be stored locally. Make sure to save it properly, any one who received your QR code could take your order',
    no_cost_gas: 'The operations of sign and submit order will not cost gas',
    sign_and_submit: 'Sign and Submit'
  },
  p2p_order: {
    order_title: 'Privacy P2P Trade',
    amounts_placeholder: 'Amount to sell',
    amountb_placeholder: 'Amount to buy',
    token_balance: 'Token Balance',
    order_detail: 'Order Detail',
    generate_order: 'Generate Order',
    instruction: '1. 以您希望的兑换率生成一个订单，把不包含鉴权数据（没有这部分数据任何人都无法撮合您的订单）的订单信息提交给relay，同时将生成的订单hash和鉴权信息生成二维码。</br>2. 您可以把这个二维码发送给您的朋友，任何人拿到这个二维码都有可能吃掉您的订单，请注意以安全的方式传播。</br>3. 对方使用Circulr移动端扫描二维码，下一个与您买入卖出量完全匹配的对手单，发送以太坊交易吃掉这个订单，因此吃单方需要消耗油费。',
    notice: '* P2P订单不需要支付LRC手续费</br>',
    user_center_p2p:'P2P Trade'
  },
  sign: {
    not_signed: "You may have some items not signed",
    to_sign: "To Sign"
  },
  // -----------
  // transaction
  // -----------
  tx: {
    title: 'Transactions',
    type: words.type,
    direction: 'In & Out',
    gas: words.gas,
    block: words.block,
    nonce: words.nonce,
    txHash: 'Hash',
    created: 'Submit Time',
    status: words.status,
    confirm_time: 'Confirm Time',
    value: 'Value',
    to: 'To'
  },
  tx_status: {
    all: 'All status',
    pending: 'Pending',
    success: 'Succeed',
    failed: 'Failed',
  },
  tx_type: {
    all: 'All types',
    sell: words.sell,
    buy: words.buy,
    transfer: 'Transfer',
    receive: 'Receive',
    approve: 'Approve',
    lrc_fee: words.lrc_fee,
    lrc_reward: words.lrc_reward,
    convert: 'Convert',
    cancel_order: 'Cancel order',
    cancel_all: 'Cancel all orders',
    cancel_pair_order: 'Cancel market pair orders ',
    others: 'Others'
  },
  tx_list: {
    type: {
      sell: 'Sold {value} {symbol}',
      buy: 'Bought {value} {symbol}',
      transfer: 'Sent {value} {symbol}',
      receive: 'Received {value} {symbol}',
      approve: 'Enabled trading {symbol} ',
      lrc_fee: 'Payed {value} Trading Fee',
      lrc_reward: 'Received {value} Trading Reward',
      convert_eth: 'Convert {value} ETH to WETH',
      convert_weth: 'Convert {value} WETH to ETH',
      cancel_order: 'Cancel Order',
      cancel_all: 'Cancel All Orders',
      cancel_pair_order: 'Cancel {pair} Orders ',
      others: 'Others'
    }

  },
  tx_detail: {
    detail_title: 'Transaction Detail',
    tabs_basic: 'Basic Detail',
    tabs_fill: 'Fill Detail',
  },
  // -----------
  // fill
  // -----------
  fill: {
    ringIndex: "ID",
    price: words.price,
    amount: words.amount,
    total: words.total,
    lrc_fee: words.lrc_fee,
    lrc_reward: words.lrc_reward,
    margin_split: words.margin_split,
    created:'Created',
  },
  fill_list: {
    my_recent_fills:'Recent Fills',
    my_all_fills:'All Fills',
    trade_history:'Trade History',
  },
  fill_detail: {
    fill_detail:'Fill Detail',
  },
  ring: {
    ringIndex: "RingIndex",
    ringHash: "RingHash",
    miner: "Miner",
    txHash: "TxHash",
    block: "Block",
    recipient: "Fee Recipient",
    total_lrc_fee: words.lrc_fee,
    total_lrc_reward: words.lrc_reward,
    total_margin_split: words.margin_split,
    time: words.time,
  },
  ring_detail:{
    ring_detail:"Ring Detail",
  },
  // -----------
  // ticker
  // -----------
  ticker: {
    market: words.market,
    price: words.price,
    change: '24H Change',
    last: 'Last Price',
    high: '24H High',
    low: '24H Low',
    vol: '24H Volume',
  },
  ticker_list: {
    title_loopring_tickers: 'Loopring DEX Markets',
    title_reference_tickers: 'Reference Markets',
    title_recent: 'Recent',
    title_favorites: 'Favorites',
    title_innovation: "New"
  },
  // -----------
  // token
  // -----------
  token_list: {
    total_value: '总资产',
    actions_hide_small_balance: 'Hide tokens with small balance',
    actions_show_my_favorites: 'Only show my favorites',
    actions_send: words.send,
    actions_receive: words.receive,
    actions_trade: words.trade,
    actions_convert_eth_to_weth: '转换 ETH 为 WETH',
    actions_convert_weth_to_eth: '转换 WETH 为 ETH',
  },
  // -----------
  // transfer
  // -----------
  transfer: {
    token_selector_placeholder: 'Select Token',
    data: "Data",
    advanced: "Advanced",
    send_max: "Send Max",
    transfer_result_etherscan: "View transaction on Etherscan.io",
    from: "From",
    to: "To",
    gas: "Gas",
  },
  token: {
    action_options: '{token} Options',
    action_types: {
      receive: "Receive {token}",
      send: " Send {token}",
      trade: "Trade {token}",
      convert: 'Convert to {token}'
    },
    assets_title: 'Total Value',
  },
  convert: {
    convert_eth_title:'Convert ETH to WETH',
    convert_weth_title:'Convert WETH to ETH',
    convert_eth_tip: '0.1 ETH is reserved as gas so that you can send additional transactions.',
    actions_confirm_convert: 'Convert Now',
    actions_max: "Convert All",
    notification_suc_title:'Succeed to Convert {value} {token}',
    notification_fail_title:'Failed to Convert {value} {token}',
    not_enough_tip:'{token} not enough'
  },
  receive: {
    receive_title: 'My {token} Address',
    receive_value_tip: 'Recommended value',
  },
  // -----------
  // wallet
  // -----------
  unlock: {
    has_not_unlocked: 'Your wallet hasn\'t unlocked yet',
    title_connect: 'Connect to {walletType}',
    to_unlock: 'To Unlock',
    actions_unlock: 'Unlock',
    actions_connect: "Connect to {walletType} wallet",
    connect_ledger_tip: "Please connect to your Ledger Wallet",
    connect_trezor_tip: "Please connect to your TREZOR",
    error_invalid_tip: 'Invalid Information',
  },
  password: {
    password_strength_title: 'Password Strength',
    password_strength: {
      weak: 'weak',
      average: 'average',
      strong: 'strong'
    },
    password_tips_weak: 'Password is too weak, at least 7 characters',
    password_tips_lack: 'Please input your password'
  },

  wallet_type: {
    generate: 'Generate',
    address: 'Address',
    metamask: "MetaMask Wallet",
    json: "Json ",
    mnemonic: 'Mnemonic',
    private_key: 'Private Key',
    trezor: 'TREZOR',
    ledger: 'Ledger Wallet'
  },
  wallet_generate: {
    title_generate: 'Generate Wallet',
    actions_generate: 'Generate Now',
    backup_title: 'Backup Wallet',
    backup_tip: 'Circular doesn\'t keep a copy of your private key, keystore file, or mnemonic words. Make sure you back up these information immediately.',
    actions_backup_json: 'I understand，download the wallet file',
    actions_backup_mnemonic: 'I understand, copy mnemonic',
    actions_backup_private: 'I understand, copy private key',
  },

  wallet_meta: {
    actions_get_metaMask: "Get MetaMask {browser} extension",
    actions_visit_metaMask: " Visit MetaMask Website",
    browser_tip: "Your Browser do not support MetaMask, try Chrome instead",
    unlock_steps_title: 'Steps You Should Do',
    unlock_metaMask_tip: 'Unlock MetaMask',
    install_metaMask_tip: 'Install MetaMask',
    unlock_refresh_button: 'All Done? Refresh Circular',
    unlock_cancel_button: 'Cancel',
    unlock_step_install_title: 'Install MetaMask',
    unlock_step_install_content: 'Install MetaMask extension for your browser',
    unlock_step_unlock_title: 'Unlock MetaMask',
    unlock_step_unlock_content: 'To create an account or unlock with MetaMask',
    unlock_step_refresh_title: 'Refresh Circular',
    unlock_step_refresh_content: 'Refresh Circular wallet to enable MetaMask',
    mainnet_tip: "We only support Ethereum main net when using MetaMask",
    logout_title: "Logout From MetaMask",
    logout_tip: "We detected you have logged out from MetaMask, for your assets safety we have relocked your wallet",
    account_change_title: "Account changed in MetaMask",
    account_change_tip: "Circular detected your address in MetaMask has just changed ",
    install_tip: 'Your may need to install MetaMask extension to your browser first, please reload our page after installed',
    unlock_tip: 'Failed to connect with MetaMask, please unlock and use'
  },
  address: {
    placeholder_tip: 'Address:',
    paste_address_title: 'Paste Your Address Here',
    invalid_address_tip: "Invalid Address",
  },
  wallet_determine: {
    default_address: 'Default Address',
    title_deter_address: "Select Address",
    title_select_path: 'Select Dpath',
    custom_path: 'Custom Dpath',
    no_address_tip: 'No valid addresses',
    actions_other_address: 'Select Other Address',
  },
  json: {
    title_json: 'Select JSON File',
    error_json_tip: 'Invalid keystore Json',
  },
  key: {
    placeholder: 'Private Key',
    paste_private_title: 'Paste Your Private Key Here',
    error_private_tip: 'Invalid Private Key',
    lack_private_tip: 'Please input your private key'
  },
  mnemonic: {
    actions_paste_mnemonic: 'Paste Mnemonic Here',
    error_mnemonic_tip: "Invalid Mnemonic",
    mnemonic_tip_lack: 'Please Input your mnemonic',
  },
  user_center:{
    receive:'Receive',
    send:'Send',
    tab_title: "Me",
    my_assets: 'My Assets',
    my_orders: 'My Orders',
    my_fills: 'My Fills',
  },
  kline_chart:{
    kline_chart:'Kline Chart',
  },
  price_chart:{
    price_chart:'Price Chart',
  },
  todos: {
    tab_title: "Notifications",
    instruction: "There may have some tasks you should do with your available orders to make them available.<br>1. Allowance of tokens you about to sell are not enough. <br>2. Your token balances are not enough to sell."
  },
  message_list:{
    message_list_title:'Messages',
  },
  todo_list:{
    todo_list_title:'Tasks',
    title_allowance_not_enough:"{symbol} is disabled to trade",
    title_balance_not_enough:"{symbol} balance is insufficient",
    title_converting_eth_to_weth:'Converting ETH To WETH',
    title_converting_weth_to_eth:'Converting WETH To ETH',
    status_converting: 'Conveting',
    balance:"Balance",
    selling:"Selling",
    lack:"Lack",
    actions_enable:"Enable",
    status_enabling:'Enabling',
    actions_buy:words.buy,
    actions_receive:words.receive,
    no_detail:'No detail...'
  },
  usercenter:{
    page_title:'My Account',
    actions_switch_wallet:'Switch Wallet',
  },
  market: {
    tab_charts: "Charts",
    tab_depth: "Depth",
    tab_fills: "Fills"
  },
  imtoken: {
    welcome: "Welcome to Loopring - a decentralized exchange",
    description_1: "You will enter into a dapp which is a decentralized exchange operating on the Ethereum blockchain. If you click \"I Agree\", it means that you agree with our",
    description_2: "User Agreement",
    description_3: "and",
    description_4: "Privacy Policy",
    agree: "I Agree"
  }
}
