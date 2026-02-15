export default function FilterBar({ filters, onFilterChange, jobCount }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    const handleClear = () => {
        onFilterChange({
            keyword: '',
            location: 'all',
            mode: 'all',
            experience: 'all',
            source: 'all',
            sort: 'latest'
        });
    };

    return (
        <div className="filter-bar">
            <div className="filter-bar__header">
                <h2 className="filter-bar__title">Filters</h2>
                <button className="btn btn--text" onClick={handleClear}>
                    Clear All
                </button>
            </div>

            <div className="filter-bar__controls">
                <div className="filter-control">
                    <input
                        type="text"
                        name="keyword"
                        className="input input--search"
                        placeholder="Search by title or company..."
                        value={filters.keyword}
                        onChange={handleChange}
                    />
                </div>

                <div className="filter-control">
                    <select
                        name="location"
                        className="input"
                        value={filters.location}
                        onChange={handleChange}
                    >
                        <option value="all">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Noida">Noida</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>

                <div className="filter-control">
                    <select
                        name="mode"
                        className="input"
                        value={filters.mode}
                        onChange={handleChange}
                    >
                        <option value="all">All Modes</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>
                </div>

                <div className="filter-control">
                    <select
                        name="experience"
                        className="input"
                        value={filters.experience}
                        onChange={handleChange}
                    >
                        <option value="all">All Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                    </select>
                </div>

                <div className="filter-control">
                    <select
                        name="source"
                        className="input"
                        value={filters.source}
                        onChange={handleChange}
                    >
                        <option value="all">All Sources</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                    </select>
                </div>

                <div className="filter-control">
                    <select
                        name="sort"
                        className="input"
                        value={filters.sort}
                        onChange={handleChange}
                    >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="filter-bar__results">
                <span className="filter-bar__count">Showing {jobCount} jobs</span>
            </div>
        </div>
    );
}
