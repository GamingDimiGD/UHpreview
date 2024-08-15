let k = 1
class KnowledgeItem extends ShopItem {
    constructor(name, price, description, image, type, id, onBuy, coolDown, saveCD, si, vocabAmountRequired) {
        /*
         * Create a new item in the shop using this class lol
         * @param {string} name - The name of the item
         * @param {number} price - The price of the item
         * @param {string} description - The description of the item
         * @param {string} image - The image of the item
         * @param {string} type - The type/category of the item
         * @param {string} id - The jStorage id of the item
         * @param {function} onBuy - The function to run when the item is bought
         * @param {number} coolDown - The cool down of the item (in seconds)
         * @param {boolean} saveCD - Whether to save the cool down of the item or not
         * @param {number} vocabAmountRequired - The vocabulary amount required to buy the item
         */
        super(name, price, description, image, type, id, onBuy, coolDown, saveCD, si)
        this.vocabAmountRequired = vocabAmountRequired || 0;
        if(this.price <= 0 && this.vocabAmountRequired > 0) this.item.querySelector('button').innerText = `${this.vocabAmountRequired}詞彙量解鎖`
        this.item.querySelector("button").addEventListener('click', () => {
            if(this.si !== 1) return
            if(vocabAmount < this.vocabAmountRequired) return showNotif(`你還需要${this.vocabAmountRequired - vocabAmount}個詞彙才能購買這東西！`)
            if ($.jStorage.get("sparkles") < this.price)
                return showNotif("你買不起!", 1);
                takeSparkles(this.price);
            if(this.coolDown > 0) {
                $.jStorage.set(this.id + "-cd", Date.now() + this.coolDown * 1000);
                setInterval(() => {
                    let b = this.item.querySelector("button")
                    if($.jStorage.get(this.id + "-cd") < Date.now()) {
                        b.disabled = false
                        b.innerText = this.price + "✧";
                    } else {
                        b.disabled = true
                        b.innerText = `還有${Math.floor(($.jStorage.get(this.id + "-cd") - Date.now()) / 1000)}秒`
                    }
                })
            }
            this.onBuy();
        });
    }
    disable(isDisabled, customText) {
        this.item.querySelector("button").disabled = isDisabled;
        if (isDisabled) {
            this.item.querySelector("button").innerText =
                this.price > 0?customText || "已購買":customText || "已解鎖";
        } else {
            this.item.querySelector("button").innerText = this.price > 0?this.price + "✧":`${this.vocabAmountRequired}詞彙量解鎖`;
        }
    }
}
let tips = [
    '你可以點7下某個圖片可以解成就',
    '西瓜貓會幫你賺閃',
    '隔壁那家店有個商品會騙人',
    '我需要你詞彙量累積到' + oVocab.length + '，剩下我之後再跟你講',
    '你知道，在4月1日，鍵盤直接壞掉'
]
let teach = new KnowledgeItem("教學", 0, "教店員英文領取獎勵", "../images/teach.png", "其他", "teach", () => {
    let grn = rng(120, 80)
    giveSparkles(grn)
    showNotif(`你教店員一個英文單字，獲得${grn}✧！`)
}, 240*60, true, k, 20)
let protip = new KnowledgeItem("你知道嗎", 100, "給一個找到秘密的提示", "../images/protip.png", "其他", "protip", () => {
    if(isNaN(vocabAmount)) {
        pd(characters[0], '(他不在', 0)
        return dialogue(dialogueQueue)
    }
    pd(characters[0], tips[rng(tips.length - 1)])
    dialogue(dialogueQueue)
}, 15*60, true, k, 0)