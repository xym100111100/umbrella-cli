import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('测试Generator函数', function() {
    it('helloworld', function() {
        function* helloWorldGenerator() {
            yield 'hello';
            yield 'world';
            return 'ending';
        }

        var hw = helloWorldGenerator();

        let result = hw.next();

        expect(result.value).to.equal('hello');
        expect(result.done).to.be.false;

        result = hw.next();
        expect(result.value).to.equal('world');
        expect(result.done).to.be.false;

        result = hw.next();
        expect(result.value).to.equal('ending');
        expect(result.done).to.be.true;

        result = hw.next();
        expect(result.value).to.be.undefined;
        expect(result.done).to.be.true;
    });
});
