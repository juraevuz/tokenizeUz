function autoCorrect(text){
	var text = text.toLowerCase();
	var text = text.replace(/gʻ|gʼ|g’|g'|g`|g‘/g,"ğ");
	var text = text.replace(/oʻ|oʼ|o’|o'|o`|o‘/g,"ŏ");
	var text = text.replace(/sh/g,"š");
	var text = text.replace(/ch/g,"č");
	var text = text.replace(/ʻʼ'|`|‘/g,"’");
	return text;
};

function inverseCorrect(text){
	var text = text.replace(/ğ/g,"g‘");
	var text = text.replace(/ŏ/g,"o‘");
	var text = text.replace(/š/g,"sh");
	var text = text.replace(/č/g,"ch");
	return text;
};

function createMap(text){
	var text = text.replace(/[aoueiŏ]/g,"V");
	var text = text.replace(/[bdfghjklmnpqrstvxyzğšč]/g,"C");
	var parts = text.split("’");
	
	var map = [];
	
	parts.forEach(function(v,k){
		var rem = v;
		if (k != 0){
			map.push("D");
		}
		
		l = v.length;
		for (i=0;i<l;i++){
			if (rem.length > 0) {
				if (rem[0] == "V" && rem[1] != "C"){
					map.push(1);
					rem = rem.slice(1);
				} else if (rem[0] == "V" && rem[1] == "C" && rem[2] == "V"){
					map.push(1);
					rem = rem.slice(1);
				} else if (rem[0] == "V" && rem[1] == "C" && rem[2] != "V" && rem[3] != "C"){
					map.push(2);
					rem = rem.slice(2);
				} else if (rem[0] == "V" && rem[1] == "C" && rem[2] == "C" && rem[3] != "V"){
					map.push(3);
					rem = rem.slice(3);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] != "C"){
					map.push(2);
					rem = rem.slice(2);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "V"){
					map.push(2);
					rem = rem.slice(2);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "C" && rem[4] == "V" || rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] != "C" && rem[3] != "V"){
					map.push(3);
					rem = rem.slice(3);
				} else if (rem[0] == "C" && rem[1] == "V" && rem[2] == "C" && rem[3] == "C" && rem[4] != "V"){
					map.push(4);
					rem = rem.slice(4);
				} else if (rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] != "C"){
					map.push(3);
					rem = rem.slice(3);
				} else if (rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] == "C" && rem[4] != "V" && rem[5] != "C"){
					map.push(4);
					rem = rem.slice(4);
				} else if (rem[0] == "C" && rem[1] == "C" && rem[2] == "V" && rem[3] == "C" && rem[4] == "C" && rem[5] != "V"){
					map.push(5);
					rem = rem.slice(5);
				}
			} else {
				break;
			}
		}
	});
	
	return map;
}

function mainFunc(word) {
	var rgx = /^[abdefghijklmnopqrstuvxyzŏğšč’]+$/;
	var word = autoCorrect(word).trim();
	var map = createMap(word);
	var rem = word;
	
	var r = "";
	
 	map.forEach(function(v,k){
		if (v == "D") {
			r += "’";
			rem = rem.slice(1);
		} else {
			var sl = rem.slice(0,v);
			rem = rem.slice(v);
			if (k == 0) {
				r += sl;
			} else {
				r += "-"+sl;
			}
		}
	});
	
	if (!rgx.test(word)) {
		r = "Kiritilgan so'z noto'g'ri";
	}
	
	r = inverseCorrect(r);
	
	return r;
}








