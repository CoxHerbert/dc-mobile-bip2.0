import { mergeRecursive } from '@/utils/utils';
import DictMeta from './DictMeta';

const DEFAULT_DICT_OPTIONS = {
    types: [],
};

const set = (target, key, value) => {
    if (target) {
        target[key] = value;
    }
};

export default class Dict {
    constructor() {
        this.owner = null;
        this.label = {};
        this.type = {};
    }

    init(options) {
        if (options instanceof Array) {
            options = { types: options };
        }
        const opts = mergeRecursive(DEFAULT_DICT_OPTIONS, options);
        if (opts.types === undefined) {
            throw new Error('need dict types');
        }
        const ps = [];
        this._dictMetas = opts.types.map((t) => DictMeta.parse(t));
        this._dictMetas.forEach((dictMeta) => {
            const type = dictMeta.type;
            set(this.label, type, {});
            set(this.type, type, []);
            if (dictMeta.lazy) {
                return;
            }
            ps.push(loadDict(this, dictMeta));
        });
        return Promise.all(ps);
    }

    reloadDict(type) {
        const dictMeta = this._dictMetas.find((e) => e.type === type);
        if (dictMeta === undefined) {
            return Promise.reject(`the dict meta of ${type} was not found`);
        }
        return loadDict(this, dictMeta);
    }
}

function loadDict(dict, dictMeta) {
    return dictMeta.request(dictMeta).then((response) => {
        const type = dictMeta.type;

        let dicts = arrayToTree(response);
        dict.type[type].splice(0, Number.MAX_SAFE_INTEGER, ...dicts);
        dicts.forEach((d) => {
            set(dict.label[type], d.value, d.label);
        });
        return dicts;
    });
}

function arrayToTree(data) {
    const map = new Map();
    const tree = [];

    data.forEach((item) => {
        map.set(item.id, { ...item, children: [] });
    });

    data.forEach((item) => {
        const node = map.get(item.id);
        if (item.parentId && map.has(item.parentId)) {
            map.get(item.parentId).children.push({
                ...node,
                code: node.code,
                label: node.dictValue,
                value: node.id,
            });
        } else {
            tree.push({
                ...node,
                code: node.code,
                label: node.dictValue,
                value: node.id,
            });
        }
    });

    return tree;
}
