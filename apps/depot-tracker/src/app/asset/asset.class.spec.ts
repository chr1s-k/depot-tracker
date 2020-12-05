import { Asset } from './asset.class';

describe('Asset class', () => {
  const testAsset = new Asset({
    created: new Date(),
    description: 'test description',
    id: 0,
    isin: '',
    location: '',
    name: '',
    risk: undefined,
    tickerSymbol: '',
    transactions: [
      {
        unitCount: 1,
        fee: 2,
        unitPrice: 3,
        note: 'test note',
        id: 0,
        created: new Date(),
      },
      {
        unitCount: 1,
        fee: 2,
        unitPrice: 3,
        note: 'test note',
        id: 0,
        created: new Date(),
      },
    ],
    type: undefined,
    wkn: '',
  });

  describe('happy path', () => {
    it('should calc unit count', () => {
      expect(Asset.calcFees(testAsset)).toEqual(4);
    });

    it('should calc fees', () => {
      expect(Asset.calcUnitCount(testAsset)).toEqual(2);
    });

    it('should calc value', () => {
      expect(Asset.calcValue(testAsset)).toEqual(6);
    });
  });

  describe('errors thrown', () => {
    it('should throw error on undefined input', () => {
      expect(() => Asset.calcValue(undefined)).toThrow('asset must be defined');
      expect(() =>
        Asset.calcValue({ transactions: undefined } as Asset)
      ).toThrow('asset.transactions must be defined');
    });
    it('should throw error on null input', () => {
      expect(() => Asset.calcValue(null)).toThrow('asset must be defined');
      expect(() => Asset.calcValue({ transactions: null } as Asset)).toThrow(
        'asset.transactions must be defined'
      );
    });
  });
});
