

const permutation = (array) => {
    let result = [];
    if (array.length === 1) {
      result.push(array);
      return result;
    }
    for (let i = 0; i < array.length; i++) {
      const firstElem = array.slice(i, i + 1);
      const restElem = [
        ...array.slice(0, i),
        ...array.slice(i + 1),
      ];
      let innerPermutations = permutation(restElem);
      for (let j = 0; j < innerPermutations.length; j++) {
        result.push([...firstElem, ...innerPermutations[j]]);
      }
    }
    return result;
};

const argmin = (list) => {
    let m = 1000000;
    let id = 0;
    for(let i=0;i<list.length;i++){
        if(list[i] < m){
            m = list[i];
            id = i;
        }
    }
    return id;
}

function random(array, num) {
    var a = array;
    var t = {};
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
        var i = Math.random() * l | 0;
        r[n] = t[i] || a[i];
        --l;
        t[i] = t[l] || a[l];
    }
    return r;
}

class GA {
    constructor(Spot_N, Wantgo_M, Time_T, Satisfy_S, start){
        //this.Spot_N = Spot_N;
        this.Spot_N = 4;
        this.Wantgo_M = Wantgo_M;
        this.Time_T = Time_T;
        this.Satisfy_S = Satisfy_S;
        this.start = start;
        this.generations = 10;
    }


    init(size=100, place=3){ //サイズは個体数, 場所は場所数
        let nodeslist = [];
        let num = [];
        for(let i=0;i<this.Spot_N;i++){
            num.push(i);
        }
        //デバッグ用 場所=3
        // for(let i=0;i<size;i++){
        //     nodeslist.push([2,3,1]);
        // }
        // write here ランダムに初期化してlistに入れる
        // let random = Array(this.Spot_N);
        // for(let i=0;i<1000;i++){
        //     let a = Math.random()*this.Spot_N;
        //     let b = Math.random()*this.Spot_N;
        // }
        for(let i=0;i<size;i++){
            nodeslist.push(random(num, place));
        }
        
        console.log(nodeslist);
        return nodeslist;
    }

    bitDP(){
        //
    }

    calc_cost(nodes){ //時間やお金や満足度（有名度）などの評価関数
        // don't forget to calc from startpoint
        // write here
        return 3;
    }

    all_search(nodes){ //O(N * N!)
        const shufflenodes_list = permutation(nodes);
        let cost_list = [];
        for(let i=0;i<shufflenodes_list.length/2;i++){
            cost_list.push(this.calc_cost(shufflenodes_list[i]));
        }
        let min_id = argmin(cost_list);
        return [shufflenodes_list[min_id], cost_list[min_id]];
    }

    run(){
        let nodeslist = this.init();
        console.log("kotai size is ", nodeslist.length);
        let nodes_goodroute = [];
        let score = [];
        for(let i=0;i<nodeslist.length;i++){
            const res = this.all_search(nodeslist[i]);
            nodes_goodroute.push(res[0]);
            score.push(res[1]);
            //nodes_route.push(this.all_search(nodeslist[i])); //アルゴリズムによって変える
        }

        for(let i=0;i<this.generations;i++){
            //
        }

        console.log("goodroute ", nodes_goodroute, "score ", score);
        let min_id = argmin(score);
        console.log("best answer ", nodes_goodroute[min_id], "best score ", score[min_id]);
        return {bestroute : nodes_goodroute[min_id], score : score[min_id]};
    }
}

export default GA;