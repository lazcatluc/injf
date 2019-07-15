interface Intj {
    /**
     * Registers a dependency with the container
     *
     * @param {string} name the name of the dependency
     * @param {Object} fn the dependency
     */
    register(name: string, fn: Object);

    /**
     * Resolves a dependency within the container.
     * For lazy-loading, this returns a promise rather than the real object.
     *
     * @param {string} name
     * @param {number} maxWait
     */
    resolve(name: string, maxWait?: number);

    /**
     * Removes all the dependencies registered with the container
     */
    clear();
}