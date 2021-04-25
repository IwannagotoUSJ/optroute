const INF = Infinity;

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

function compareF(a, b){
    if(a.score > b.score) return 1;
    else return -1;
}

function samearg(list){
    let set = new Set();
    for(let i=0;i<list.length;i++){
        if(set.has(list[i])) return true;
        set.add(list[i]);
    }
}

class GA {
    constructor(Spot_N, Wantgo_M, Time_T, Satisfy_S, Money_C, start){
        //this.Spot_N = Spot_N;
        this.Spot_N = 7;
        this.Wantgo_M = 4;
        this.Time_T = Time_T;
        this.Satisfy_S = Satisfy_S;
        this.start = start;
        this.generations = 3;
        this.genresize = 3;
    }

    init(size, place){ //サイズは個体数, 場所は場所数
        let nodeslist = [];
        let num = [];
        for(let i=1;i<this.Spot_N;i++){
            num.push(i);
        }
        for(let i=0;i<size;i++){
            nodeslist.push(random(num, place));
        }
        console.log("init",nodeslist);
        return nodeslist;
    }

    bitDP(){
        //
    }

    calc_cost(nodes){ //時間やお金や満足度（有名度）などの評価関数
        // don't forget to calc from startpoint
        // write here

        // let score = distancetable[0][nodes[1]];
        // for(let i=0;i<nodes.length-1;i++){
        //     score += distancetable[nodes[i]][nodes[i+1]];
        // }
        // score += distancetable[nodes[nodes.length-1]][0];
        
        return Math.random()*100;
    }

    all_search(nodes){ //O(M * M!)
        if(samearg(nodes)) return [nodes, INF];
        //if(genremismatch(nodes)) return [nodes, INF];
        const shufflenodes_list = permutation(nodes);
        let cost_list = [];
        for(let i=0;i<shufflenodes_list.length/2;i++){
            cost_list.push(this.calc_cost(shufflenodes_list[i]));
        }
        let min_id = argmin(cost_list);
        return [shufflenodes_list[min_id], cost_list[min_id]];
    }

    run(size=100, el=10){ // must be (size % el == 0)
        //console.log("size",size);
        let nodeslist = this.init(size, this.Wantgo_M); //size * M の行く場所だけ集めた配列
        console.log("kotai size is ", nodeslist.length);
        let nodes_goodroute = [];
        let score = [];
        console.assert(nodeslist.length == size);
        for(let i=0;i<size;i++){
            const res = this.all_search(nodeslist[i]);
            nodes_goodroute.push(res[0]);
            score.push(res[1]);
            //nodes_route.push(this.all_search(nodeslist[i])); //アルゴリズムによって変える
        }
        let best = [];
        for(let i=0;i<size;i++){
            best.push({route : nodes_goodroute[i], score : score[i]});
        }
        best.sort(compareF);

        //console.log("-------------stop--------");

        for(let g=0;g<this.generations;g++){ //O(G * size * M)
            console.log(g+1, " generation");
            let eliteslist = [];
            for(let i=0;i<el;i++){
                eliteslist.push(best[i].route);
            }
            //console.log("elites ", eliteslist);
            
            for(let i=0;i<el;i++){ //O(size * M)
                let parents = eliteslist[i];
                //console.log("par",parents);
                for(let j=1;j<size/el;j++){
                    let children = [];
                    for(let k=0;k<parents.length;k++){
                        children[k] = parents[k];
                    }
                    children[Math.floor(Math.random()*parents.length)] = Math.floor(Math.random()*this.Spot_N);
                    //console.log("child",children);
                    eliteslist.push(children);
                }
            }
            console.assert(eliteslist.length == size);
            for(let i=0;i<size;i++){
                const res = this.all_search(eliteslist[i]);
                best[i] = {route : res[0], score : res[1]};
            }
            best.sort(compareF);
        }

        //console.log("debug ", best[0].route);
        console.log("best ", best);
        return best;
    }
}

export default GA;