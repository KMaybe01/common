		/* 方案一：利用 “对象==数字” 先把对象toString转换为字符串，然后在转换为数字后才做比较的机制，通过重写toString方法来实现 */
		var a = {
			i: 0,
			toString: function () {
				return ++a.i;
			}
		};
		if (a == 1 && a == 2 && a == 3) {
			// 这样保证条件成立
			console.log(1);
		}


		/* 方案二：利用with表达式来实现 */
		var i = 0;
		with({
			get a() {
				return ++i;
			}
		}) {
			if (a == 1 && a == 2 && a == 3) {
				console.log(1);
			}
		}

		/* 方案三： 利用Object.defineProperty，在获取全局属性a的值的时候，触发GETTER函数，从而返回指定的值（Vue2.0双向数据绑定的原理）*/
		// var i = 0;
		// Object.defineProperty(window, 'a', {
		// 	get: function () {
		// 		return ++i;
		// 	}
		// });
		// if (a == 1 && a == 2 && a == 3) {
		// 	console.log(1);
		// }

		/* 方案四： 和方案一类似，都是在对象和数字比较的时候，依托默认会把对象转换为字符串，在转换为数字的原则，调取toString方法的时候做一些手脚  => 改为a.join=a.shift 也是可以的*/
		var a = [1, 2, 3];
		a.toString = a.shift;
		if (a == 1 && a == 2 && a == 3) {
			console.log(1);
		}