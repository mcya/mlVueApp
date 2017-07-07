<?php
/**
 * 请求交易系统封装方法类
 * @author Eason
 *
 */
class trade extends CI_Model {
	private $_mKey = 'HsB1ZqZUr6UDG553e37e8S06JN3vj1ng';
	private $_timeout = 3;
	private $_logINFO = 'trade-log';
	
	public function __construct() {
		parent::__construct();
		$this->load->library('curl');
	}
	
	private function _sign($data) {
		//生成sign
		ksort($data);
		$str = '';
		foreach ($data as $kk => $vv) {
			$str .= $vv;
		}
		$str .= $this->_mKey;
		$sign = md5($str);
		$sign = base64_encode($sign);
		return $sign;
	}
	
	/**
	 * 提交订单
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2424892
	 */
	public function createOrder($data) {
		$url = 'http://order.mlxing.com/order/checkout/order';
		
		$data['sign'] = $this->_sign($data);
		//请求接口
		_INFO('createOrder->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('createOrder->getData|data:'.$result, $this->_logINFO);

		$result = json_decode($result, true);

		return $result;
	}
	
	/**
	 * 支付接口
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425055
	 * @return mixed
	 */
	public function payOrder($data) {
		$url = 'http://order.mlxing.com/order/pay/order';
		
		$data['sign'] = $this->_sign($data);
		//请求接口
		_INFO('payOrder->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('payOrder->getData|data:'.$result, $this->_logINFO);

		$result = json_decode($result, true);
		return $result;
	}
	
	/**
	 * 确认订单完成接口
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2883856
	 * @param int $mid
	 * @param String $order_id
	 * @return mixed
	 */
	public function confirmOrder($mid, $order_id) {
		$url = 'http://order.mlxing.com/order/order/confirm';

		$data = array(
			'userId'		=>$mid,
			'orderId'		=>$order_id,
			'methodType'	=>'orderConfirm'
		);
		
		$data['sign'] = $this->_sign($data);
		_INFO('confirmOrder->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('confirmOrder->getData|data:'.$result, $this->_logINFO);
		$result = json_decode($result, true);
		return $result;
	}

	/**
	 * [orderList 管理订单查询]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=3506256
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function orderListManage($data) {
		$url = 'http://order.mlxing.com/order/order/listmanage';
		
		$data['sign'] = $this->_sign($data);
		
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		
		$result = json_decode($result, true);
		return $result;
	}
	
	/**
	 * [orderRefund 订单退款申请]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425359
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function orderRefund($data) {
		$url = 'http://order.mlxing.com/order/refund/apply';
		
		$data['sign'] = $this->_sign($data);
		_INFO('orderRefund->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('orderRefund->getData|data:'.$result, $this->_logINFO);
		$result = json_decode($result, true);
		return $result;
	}
	
	/**
	 * [orderRefundCheck 订单退款审核]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425167
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function orderRefundCheck($data) {
		$url = 'http://order.mlxing.com/order/refund/check';
		
		$data['sign'] = $this->_sign($data);
		_INFO('orderRefundCheck->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('orderRefundCheck->getData|data:'.$result, $this->_logINFO);
		$result = json_decode($result, true);
		return $result;
	}
	/**
	 * [orderRefundList 退款订单批量查询]
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function orderRefundList($data) {
		$url = 'http://order.mlxing.com/order/refund/list';
		
		$data['sign'] = $this->_sign($data);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('orderRefundList->getData|data:'.$result, $this->_logINFO);
		$result = json_decode($result, true);
		return $result;
	}

	/**
	 * [orderList 会员订单查询]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425068
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function orderList($data) {
		$url = 'http://order.mlxing.com/order/order/list';
		
		$data['sign'] = $this->_sign($data);
		
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		
		$result = json_decode($result, true);
		return $result;
	}
	
	/**
	 * [orderCancel 会员订单取消]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425092
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function orderCancel($data) {
		$url = 'http://order.mlxing.com/order/order/cancel';
		
		$data['sign'] = $this->_sign($data);
		
		_INFO('orderCancel->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('orderCancel->getData|data:'.$result, $this->_logINFO);
		
		$result = json_decode($result, true);
		return $result;
	}
	
	/**
	 * [orderDetail 用户查询订单详情]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425073
	 * @param  [type] $mid      [description]
	 * @param  [type] $order_id [description]
	 * @return [type]           [description]
	 */
	public function orderDetail($mid, $order_id) {
		$url = 'http://order.mlxing.com/order/order/detail';

		$data = array(
			'userId'		=>$mid,
			'orderId'		=>$order_id,
			'methodType'	=>'orderDetail'
		);
		
		$data['sign'] = $this->_sign($data);
		
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		
		$result = json_decode($result, true);
		return $result['result'];
	}
	
	/**
	 * [orderRepay 重新支付]
	 * @link http://wiki.jszx.chineseml.com:3200/pages/viewpage.action?pageId=2425063
	 * @param  [type] $mid      [description]
	 * @param  [type] $order_id [description]
	 * @return [type]           [description]
	 */
	public function orderRepay($mid, $order_id) {
		$url = 'http://order.mlxing.com/order/checkout/repay';
		
		$data = array(
			'userId'		=>$mid,
			'orderId'		=>$order_id,
			'methodType'	=>'orderRepay'
		);
		$data['sign'] = $this->_sign($data);
		_INFO('orderRepay->sendData|data:'.json_encode($data), $this->_logINFO);
		$result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
		_INFO('orderRepay->getData|data:'.$result, $this->_logINFO);
		$result = json_decode($result, true);
		return $result;
	}

    /**显示微信支付订单号
     * @param $orderJnId
     * @return mixed
     */
    public function getPayNoByJnId_v2( $orderJnId ){

        $url = 'http://order.mlxing.com/order/orderJn/list';
        $data = array(
            'startDate'     => date('Ymd',time()-12*3600*24),
            'endDate'       => date('Ymd',time()),
            'orderJnId'		=> $orderJnId,
            'methodType'    => 'orderJnList'
        );
        $data['sign'] = $this->_sign($data);
        _INFO('getPayNoByJnId->sendData|data:'.json_encode($data), $this->_logINFO);
        $result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
        _INFO('getPayNoByJnId->getData|data:'.$result, $this->_logINFO);
        $result = json_decode($result, true);

        return $result;
    }

    /**显示微信支付订单号
     * @param $orderJnId
     * @return mixed
     */
    public function getPayNoByJnId( $orderJnId ){

        $url = 'http://order.mlxing.com/order/orderJn/find';
        $data = array(
            'orderJnId'		=> $orderJnId,
            'methodType'    => 'orderJnFind'
        );
        $data['sign'] = $this->_sign($data);
        _INFO('getPayNoByJnId->sendData|data:'.json_encode($data), $this->_logINFO);
        $result = $this->curl->simple_post($url, $data, array(CURLOPT_TIMEOUT=>$this->_timeout));
        _INFO('getPayNoByJnId->getData|data:'.$result, $this->_logINFO);
        $result = json_decode($result, true);

        return $result;
    }

}