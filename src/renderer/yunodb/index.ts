import yunodb from 'yunodb';

const dbOpts = {
    location: './.kbdb',
    keyField: 'id',
    indexMap: ['title', 'text']
};

let db = yuno(dbOpts, (err, dbHandle) => {
    if (err) throw err;

    db = dbHandle;
});

export default db;
