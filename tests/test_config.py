from app.config import Settings


def test_cors_origins_are_loaded_from_environment(monkeypatch):
    monkeypatch.setenv(
        "CORS_ORIGINS", "https://first.example, https://second.example, "
    )
    settings = Settings(_env_file=None)

    assert settings.cors_origins == [
        "https://first.example",
        "https://second.example",
    ]


def test_legacy_cors_environment_name_is_supported():
    settings = Settings(CORS_ALLOW_ORIGINS="https://legacy.example")

    assert settings.cors_origins == ["https://legacy.example"]
