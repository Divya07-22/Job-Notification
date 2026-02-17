import Input from './ui/Input';

export default function FilterBar({ filters, onFilterChange }) {

    const handleChange = (key, value) => {
        onFilterChange(prev => ({ ...prev, [key]: value }));
    };

    const selectStyle = {
        padding: 'var(--space-sm)',
        border: '2px solid var(--color-border)',
        borderRadius: 'var(--border-radius)',
        backgroundColor: 'var(--color-surface)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-size-base)',
        minWidth: '150px'
    };

    return (
        <div className="filter-bar" style={{
            marginBottom: 'var(--space-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)'
        }}>
            <div className="search-row">
                <Input
                    placeholder="Search roles or companies..."
                    value={filters.keyword}
                    onChange={(e) => handleChange('keyword', e.target.value)}
                />
            </div>

            <div className="filter-row" style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                <select
                    style={selectStyle}
                    value={filters.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                >
                    <option value="all">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Noida">Noida</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    style={selectStyle}
                    value={filters.mode}
                    onChange={(e) => handleChange('mode', e.target.value)}
                >
                    <option value="all">All Modes</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    style={selectStyle}
                    value={filters.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                >
                    <option value="all">All Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                </select>

                <select
                    style={selectStyle}
                    value={filters.source}
                    onChange={(e) => handleChange('source', e.target.value)}
                >
                    <option value="all">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Campus">Campus</option>
                </select>

                <select
                    style={selectStyle}
                    value={filters.sort}
                    onChange={(e) => handleChange('sort', e.target.value)}
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        </div>
    );
}
