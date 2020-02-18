const each = t => ([def], ...vars) => 
  (description, testFunction, ...options) => {
    const keys = def
      .replace(/\n/g, '')
      .split('|')
      .map(k => k.trim());
    
    const numberOfKeys = keys.length;
    const numberOfVars = vars.length;

    if (numberOfVars % numberOfKeys)
      throw 'You must provide one variable per key';

    const numberOfSets = numberOfVars / numberOfKeys;
    const sets = [...new Array(numberOfSets)].map(() => ({}));

    for(let i = 0; i < numberOfVars; i++) {
      const setIndex = ~~(i / numberOfKeys);
      const key = keys[i % numberOfKeys];

      sets[setIndex][key] = vars[i];
    }

    sets.forEach(s => {
      const setDescription = description.replace(
        /(?:\$)([^ ]+)/g,
        (_, key) => s[key],
      );

      t(
        setDescription,
        (...params) => testFunction(s, ...params),
        ...options,
      );
    });
  };


global.it.each = each(it);
global.xit.each = each(xit);
jasmine.getEnv().it.each = global.it.each;
jasmine.getEnv().xit.each = global.xit.each;

/**
 * fit cannot be patched
 * focusedRunnables & unfocusAncestor are not public
 */
