import sinon from 'sinon';
import { expect } from 'chai';
import { Interval } from './date';
import { subDays, subHours, subMonths } from 'date-fns';

describe('date interval helpers', function() {
  describe('Interval class', function() {
    let clock;

    beforeEach(function() {
      // ensure date tests are stable by stopping time
      clock = sinon.useFakeTimers(new Date('Apr 01 2017'));
    });

    afterEach(function() {
      clock.restore();
    });

    it('throws an error if a malformed interval is passed in', function() {
      let assertions = 6;

      try {
        new Interval({ start: new Date() });
      } catch (e) {
        assertions--;
      }

      try {
        new Interval({ end: new Date() });
      } catch (e) {
        assertions--;
      }

      try {
        new Interval({ window: new Date() });
      } catch (e) {
        assertions--;
      }

      try {
        new Interval({ _start: new Date(), _end: 5 });
      } catch (e) {
        assertions--;
      }

      try {
        new Interval({ _start: 5, _end: new Date() });
      } catch (e) {
        assertions--;
      }

      new Interval({ window: [24, 'h'], start: new Date() });
      assertions--;

      expect(assertions).to.equal(0);
    });

    it('translates a window to a concrete start/end', function() {
      const hourRange = new Interval({ window: [12, 'h'] });
      const dayRange = new Interval({ window: [2, 'd'] });
      const monthRange = new Interval({ window: [2, 'm'] });

      expect(hourRange.start).to.eql(subHours(new Date(), 12));
      expect(hourRange.end).to.eql(new Date());

      expect(dayRange.start).to.eql(subDays(new Date(), 2));
      expect(dayRange.end).to.eql(new Date());

      expect(monthRange.start).to.eql(subMonths(new Date(), 2));
      expect(monthRange.end).to.eql(new Date());
    });

    it('returns the same interval given a fixed interval', function() {
      const start = subDays(new Date(), 2);
      const end = subDays(new Date(), 1);

      const interval = new Interval({ start, end });

      expect(interval.start).to.eql(start);
      expect(interval.end).to.eql(end);
    });

    it('prioritizes the window if both window and start/end exist in a interval', function() {
      const interval = new Interval({
        start: subDays(new Date(), 2),
        end: new Date(),
        window: [12, 'h']
      });

      expect(interval.start).to.eql(subHours(new Date(), 12));
      expect(interval.end).to.eql(new Date());
    });

    it('returns whether the interval will be treated as static/sliding', function() {
      const intervalBoth = new Interval({
        start: subDays(new Date(), 2),
        end: new Date(),
        window: [12, 'h']
      });

      expect(intervalBoth.isStatic()).to.be.false;
      expect(intervalBoth.isSliding()).to.be.true;

      const intervalWindow = new Interval({
        window: [12, 'h']
      });

      expect(intervalWindow.isStatic()).to.be.false;
      expect(intervalWindow.isSliding()).to.be.true;

      const intervalStatic = new Interval({
        start: subDays(new Date(), 2),
        end: new Date()
      });

      expect(intervalStatic.isStatic()).to.be.true;
      expect(intervalStatic.isSliding()).to.be.false;
    });

    it('tests equality across instances with isEqual', function() {
      expect(
        new Interval({
          start: subDays(new Date(), 2),
          end: new Date(),
          window: [12, 'h']
        }).isEqual(
          new Interval({
            start: subDays(new Date(), 2),
            end: new Date(),
            window: [12, 'h']
          })
        )
      ).to.be.true;

      expect(
        new Interval({
          start: subDays(new Date(), 2),
          end: new Date()
        }).isEqual(
          new Interval({
            start: subDays(new Date(), 2),
            end: new Date()
          })
        )
      ).to.be.true;

      expect(
        new Interval({
          window: [12, 'h']
        }).isEqual(
          new Interval({
            window: [12, 'h']
          })
        )
      ).to.be.true;

      expect(
        new Interval({
          start: subDays(new Date(), 2),
          end: new Date(),
          window: [12, 'h']
        }).isEqual(
          new Interval({
            start: subDays(new Date(), 2),
            end: new Date(),
            window: [13, 'h']
          })
        )
      ).to.be.false;

      expect(
        new Interval({
          start: subDays(new Date(), 2),
          end: new Date(),
          window: [12, 'h']
        }).isEqual(
          new Interval({
            start: subDays(new Date(), 3),
            end: new Date(),
            window: [12, 'h']
          })
        )
      ).to.be.true; // if window is present, ignore start/end

      expect(
        new Interval({
          start: subDays(new Date(), 2),
          end: new Date()
        }).isEqual(
          new Interval({
            start: subDays(new Date(), 3),
            end: new Date()
          })
        )
      ).to.be.false;

      expect(
        new Interval({
          start: subDays(new Date(), 3),
          end: new Date()
        }).isEqual(
          new Interval({
            start: subDays(new Date(), 3),
            end: subDays(new Date(), 2)
          })
        )
      ).to.be.false;

      expect(
        new Interval({
          window: [12, 'h']
        }).isEqual(
          new Interval({
            window: [13, 'h']
          })
        )
      ).to.be.false;

      expect(
        new Interval({
          label: 'last 12 hours',
          window: [12, 'h']
        }).isEqual(
          new Interval({
            label: 'previous 12 hours',
            window: [12, 'h']
          })
        )
      ).to.be.true; // ignores label
    });

    it('JSON stringifies to start/end, also serializing private properties', function() {
      const windowInterval = new Interval({
        window: [12, 'h']
      });
      const staticInterval = new Interval({
        start: subDays(new Date(), 2),
        end: new Date()
      });

      expect(JSON.stringify(windowInterval)).to.equal(
        JSON.stringify({
          start: subHours(new Date(), 12),
          end: new Date(),
          _window: [12, 'h']
        })
      );

      expect(JSON.stringify(staticInterval)).to.equal(
        JSON.stringify({
          start: subDays(new Date(), 2),
          end: new Date(),
          _start: subDays(new Date(), 2),
          _end: new Date()
        })
      );
    });

    it('parses back from JSON', function() {
      const windowInterval = new Interval({
        window: [12, 'h']
      });
      const staticInterval = new Interval({
        start: subDays(new Date(), 2),
        end: new Date()
      });

      expect(
        Interval.fromJSON(JSON.stringify(windowInterval)).isEqual(
          windowInterval
        )
      ).to.be.true;

      expect(
        Interval.fromJSON(JSON.stringify(staticInterval)).isEqual(
          staticInterval
        )
      ).to.be.true;
    });

    it('sets/gets a label', function() {
      const interval = new Interval({
        label: 'My Interval',
        window: [12, 'h']
      });

      expect(interval.label).to.equal('My Interval');
    });

    it('formats the interval as a human-readable string', function() {
      const labelInterval = new Interval({
        label: 'My Interval',
        window: [12, 'h']
      });

      expect(labelInterval.toString()).to.equal('My Interval');

      const windowInterval = new Interval({
        window: [36, 'h']
      });

      expect(windowInterval.toString()).to.equal('03/30/2017 – 04/01/2017');

      const staticInterval = new Interval({
        start: subDays(new Date(), 3),
        end: new Date()
      });

      expect(staticInterval.toString()).to.equal('03/29/2017 – 04/01/2017');
    });

    it('allows setting start/end', function() {
      let staticInterval = new Interval({
        start: subDays(new Date(), 2),
        end: new Date()
      });

      staticInterval.start = subDays(new Date(), 3);
      staticInterval.end = subDays(new Date(), 1);

      expect(
        staticInterval.isEqual(
          new Interval({
            start: subDays(new Date(), 3),
            end: subDays(new Date(), 1)
          })
        )
      ).to.be.true;

      let validated = 0;
      try {
        staticInterval.start = 'asdf';
      } catch (e) {
        validated++;
      }

      try {
        staticInterval.end = 'asdf';
      } catch (e) {
        validated++;
      }

      expect(validated).to.equal(2, 'validates when setting start/end');
    });
  });
});
