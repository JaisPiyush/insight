<template>
    <div class="leaderboard">
        <div class="main-panel">
            <div class="options flex">
                <div class="opti pt-2"><a @click.prevent="changestage1()">My Rank</a></div>
                <div class="opti pt-2"><a @click.prevent="changestage2()">Global Rank</a></div>
                <div class="opti pt-2"><a @click.prevent="changestage3()">Nearby Rank</a></div>
            </div>
            <div class="boards ">
                <!-- My Rank -->
                <div class="myrank rounded-lg" v-show="showmyrank">
                    <div class="rank-date pt-1 font-bold">10 jul 20 - 16 jul 20</div>
                    <div class="flex flex-row">
                        <div class="category pr-4">
                            <div name = "dropdown" class=" pl-3 pt-3 ">
                                <select class="selectBox font-bold">
                                    <option class="pl-2" value = "All" selected>All</option>
                                    <option class="pl-2" value = "Photography" >Photography</option>
                                    <option class="pl-2" value = "Art">Art</option>
                                    <option class="pl-2" value = "Dance">Dance</option>
                                </select>
                            </div>
                        </div>
                        <div class="rank text-green-600 pt-3">Rank</div>
                        <div class="score text-green-600 pt-3">Score</div>
                    </div>
                    <div class="flex flex-column">
                            <ul class="category1 pl-3 pt-1">
                                <li class="pt-1">Photography</li>
                            </ul>
                            <ul class="rank1 pl-2 pt-1">
                                <li class="pt-1">1</li>
                            </ul>
                            <ul class="score1 pl-2 pt-1">
                                <li class="pt-1">600</li>
                            </ul>
                    </div>
                </div>
                <!-- My Rank -->



                <!-- Global Rank -->
                <div class="globalrank rounded-lg" v-show="showglobalrank">
                    <div class="rank-date pt-1 font-bold">10 jul 20 - 16 jul 20</div>
                    <div class="flex flex-row ">
                        <div class="category pr-4">
                            <div name = "dropdown" class=" pl-3 pt-3 ">
                                <select class="selectBox font-bold">
                                    <option class="pl-2" value = "Photography" selected>Photography</option>
                                    <option class="pl-2" value = "Art">Art</option>
                                    <option class="pl-2" value = "Dance">Dance</option>
                                </select>
                            </div>
                        </div>
                        <div class="rank text-green-600 pt-3 ">Rank</div>
                        <div class="score text-green-600 pt-3">Score</div>
                    </div>
                    <div class="flex flex-column">
                            <ul class="category1 pl-3 pt-1">
                                <li class="pt-1">Photography</li>
                            </ul>
                            <ul class="rank1 pl-2 pt-1">
                                <li class="pt-1">1</li>
                            </ul>
                            <ul class="score1 pl-2 pt-1">
                                <li class="pt-1">600</li>
                            </ul>
                    </div>
                </div>
                <!-- Global Rank -->



                <!-- Nearby Rank -->
                <div class="arearank rounded-lg" v-show="showarearank">
                    <div class="rank-date pt-1 font-bold">10 jul 20 - 16 jul 20</div>
                    <div class="areaField">
                        <div class="fieldApply"></div>
                        <div class="fieldAction flex">
                            <div class="fc rounded-lg">Cancel</div>
                            <div class="fc bg-green-500 text-white rounded-lg">Apply</div>
                        </div>
                    </div>
                     <div class="flex flex-row">
                        <div class="category pr-4">
                            <div name = "dropdown" class=" pl-3 pt-3 ">
                                <select class="selectBox font-bold">
                                    <option class="pl-2" value = "All" selected>All</option>
                                    <option class="pl-2" value = "Photography" >Photography</option>
                                    <option class="pl-2" value = "Art">Art</option>
                                    <option class="pl-2" value = "Dance">Dance</option>
                                </select>
                            </div>
                        </div>
                        <div class="rank text-green-600 pt-3">Rank</div>
                        <div class="score text-green-600 pt-3">Score</div>
                    </div>
                    <div class="flex flex-column">
                            <ul class="category1 pl-3 pt-1">
                                <li class="pt-1">Photography</li>
                            </ul>
                            <ul class="rank1 pl-2 pt-1">
                                <li class="pt-1">1</li>
                            </ul>
                            <ul class="score1 pl-2 pt-1">
                                <li class="pt-1">600</li>
                            </ul>
                    </div>
                </div>
                <!-- Nearby Rank -->
            </div>
        </div>
    </div>
</template>


<script>
export default {



 layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
  
  data() {
      return {
        loginStage: 'myrank',
        currentPage: 'my',
      }
    },
  computed: {
    showmyrank() {
        return this.currentPage === 'my';
    },
    showglobalrank() {
        return this.currentPage === 'global';
    },
    showarearank() {
        return this.currentPage === 'area';
    }
  },
    methods : {
        changestage1() {
            this.currentPage = 'my';
        },
        changestage2() {
            this.currentPage = 'global';
        },
        changestage3() {
            this.currentPage = 'area';
        }
  }
}
</script>



<style scoped>

.leaderboard {
    width: 100%;
    height: 100%;
    position: relative;
}

.main-panel {
    width: 95%;
    height: 3rem;
    margin: auto;
    position: relative;
}

.options {
    width: 100%;
    height: 3rem;
    position: absolute;
    display: flex;
    flex-direction: row;
}

.opti {
    width: 33%;
    height: 100%;
    text-align: center;
    color: gray;
    border-bottom: 1px solid rgb(68, 67, 67);

}

.opti:hover {
    width: 33%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    color: rgb(6, 20, 155);
    border-bottom: 2px solid  rgb(5, 13, 87);

}

.boards {
    width: 100%;
    height: 100vh;
    margin: auto;
    margin-top: 4rem;
    position: absolute;
    overflow: hidden;
}

.myrank {
    width: 100%;
    height: 30rem;
    position: relative;
    box-shadow: 0px 4px 8px grey;
}

.globalrank {
    width: 100%;
    height: 30rem;
    position: relative;
    box-shadow: 0px 4px 8px grey;
}

.arearank {
    width: 100%;
    height: 30rem;
    position: relative;
    box-shadow: 0px 4px 8px grey;
}

.rank-date {
    width: 100%;
    height: 2rem;
    text-align: center;
}


.category {
    width: 60%;
    border-bottom: 1px solid rgb(172, 172, 172);
}

.rank {
    width: 20%;
    border-bottom: 1px solid rgb(172, 172, 172);

}

.score {
    width: 20%;
    border-bottom: 1px solid rgb(172, 172, 172);
}

.category1 {
    width: 60%;
}

.rank1 {
    width: 20%;

}

.score1 {
    width: 20%;
}

.selectBox {
    outline: none;
    margin-right: 1rem;
    cursor: pointer;
}

.areaField {
    width: 90%;
    height: 7rem;
    margin-left: 5%;
    position: relative; 
}

.fieldApply {
    width: 100%;
    height: 4rem;
}
.fieldAction {
    width: 100%;
    height: 3rem;
    text-align: center;
}

.fc {
    width: 25%;
    height: 1.8rem;
    margin-top: 0.5rem;
    border: 1px solid grey;
    margin-left: 17%;
}
</style>